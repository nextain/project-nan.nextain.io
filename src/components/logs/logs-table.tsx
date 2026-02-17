"use client";

import { Fragment, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { UsageLog } from "@/lib/gateway-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LogsTable({
  logs,
  dict,
  lang,
}: {
  logs: UsageLog[];
  dict: Dictionary;
  lang: "ko" | "en";
}) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const statuses = useMemo(
    () => Array.from(new Set(logs.map((log) => log.status))).filter(Boolean),
    [logs],
  );

  const filtered = useMemo(() => {
    return logs.filter((log) => {
      const statusMatch = statusFilter === "all" ? true : log.status === statusFilter;
      const modelMatch = modelFilter
        ? (log.model ?? "").toLowerCase().includes(modelFilter.toLowerCase())
        : true;
      return statusMatch && modelMatch;
    });
  }, [logs, statusFilter, modelFilter]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs text-muted-foreground">{dict.logs.filterStatus}</span>
          <select
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{dict.logs.all}</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className="text-xs text-muted-foreground">{dict.logs.filterModel}</span>
          <Input
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value)}
            placeholder={dict.logs.columns.model}
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{dict.logs.columns.time}</TableHead>
              <TableHead>{dict.logs.columns.status}</TableHead>
              <TableHead>{dict.logs.columns.model}</TableHead>
              <TableHead>{dict.logs.columns.tokens}</TableHead>
              <TableHead className="text-right">{dict.logs.columns.cost}</TableHead>
              <TableHead className="w-[120px]">{dict.logs.expandDetails}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((log) => {
              const isOpen = expanded.has(log.id);
              return (
                <Fragment key={log.id}>
                  <TableRow>
                    <TableCell className="whitespace-nowrap text-xs">
                      {new Date(log.timestamp).toLocaleString(
                        lang === "ko" ? "ko-KR" : "en-US",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={log.status === "success" ? "secondary" : "destructive"}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate font-mono text-xs">
                      {log.model}
                    </TableCell>
                    <TableCell>{(log.total_tokens ?? 0).toLocaleString()}</TableCell>
                    <TableCell className="text-right">${Number(log.cost ?? 0).toFixed(6)}</TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const next = new Set(expanded);
                          if (next.has(log.id)) next.delete(log.id);
                          else next.add(log.id);
                          setExpanded(next);
                        }}
                      >
                        {dict.logs.expandDetails}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {isOpen ? (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-muted/20">
                        <div className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                          <p>
                            {dict.logs.details.id}: <span className="text-foreground">{log.id}</span>
                          </p>
                          <p>
                            {dict.logs.details.endpoint}: <span className="text-foreground">{log.endpoint}</span>
                          </p>
                          <p>
                            {dict.logs.details.provider}: <span className="text-foreground">{log.provider ?? "-"}</span>
                          </p>
                          <p>
                            {dict.logs.details.promptTokens}: <span className="text-foreground">{(log.prompt_tokens ?? 0).toLocaleString()}</span>
                          </p>
                          <p>
                            {dict.logs.details.completionTokens}: <span className="text-foreground">{(log.completion_tokens ?? 0).toLocaleString()}</span>
                          </p>
                          <p>
                            {dict.logs.details.error}: <span className="text-foreground">{log.error_message ?? "-"}</span>
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
