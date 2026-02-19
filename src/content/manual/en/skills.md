Browse and manage available skills (tools).

![Skills tab](skills-tab.png)

## Skill Types

### Built-in Skills
Embedded in the app — cannot be disabled:

| Skill | Function |
|-------|----------|
| `skill_time` | Check current date/time |
| `skill_memo` | Save/retrieve memos |
| `skill_system_status` | Check system status |
| `skill_weather` | Check weather |
| `skill_skill_manager` | Manage skills: search, enable, disable |

### Custom Skills
Added via Gateway — can be toggled on/off:
- File read/write, command execution, web search, etc.
- Gateway or Command type

## Skill Sources (Where do they come from?)

- **Built-in skills**: bundled with the app
- **Custom skills**: loaded from local skill manifests (for example, `~/.cafelua/skills/.../skill.json`)
- Expand a skill card to check its `source` badge

## How to Add a Custom Skill

1. Create a skill manifest at `~/.cafelua/skills/<skill-name>/skill.json`
2. Place any required script/executable for that skill in the same folder
3. Open the Skills tab and check if the new skill appears
4. Enable it using the toggle
5. Test it from chat with a request that should trigger the skill

If it does not appear, restart the app and check again.

## Advanced Scenario: OpenClaw + cron Automation

In team/personal automation setups, you can register skills in OpenClaw and trigger them on a schedule with cron.

Example scenarios:
- Daily 09:00: generate a summary of yesterday's work logs
- Hourly: scan a target folder and notify on anomalies
- Midnight: generate and upload a daily report

Recommended flow:
1. Register the custom skill and validate it locally first
2. Configure at least one messenger channel in OpenClaw (recommended: Slack/Discord)
3. Add a skill invocation step in your OpenClaw task definition
4. Attach a cron schedule as the recurring trigger
5. Add retry/notification policies for failures

Messenger integration allows success/failure status and summary outputs to be delivered to your team channel immediately.
- The messenger integration details below are part of the **future roadmap**.
- Using Google/Discord sign-in data to suggest messenger targets is a valid design option
- The default flow is still manual integration, and actual setup usually requires webhook or bot-token configuration
- Telegram can be kept as an optional advanced channel because bot/token setup is more involved

## Skill Cards

Each skill is displayed as a card:

![Skill card detail](skills-card.png)

- **Name**: Skill name (e.g., `skill_read_file`)
- **Description**: One-line summary (may be truncated)
- **Click**: Click the card to expand full description
- **Badges**: Type (built-in/gateway/command), security tier (T0~T3)
- **? button**: Ask AI to explain this skill
- **Toggle**: Enable/disable custom skills

## Search & Bulk Management

- **Search**: Filter by skill name or description
- **Enable All**: Activate all custom skills
- **Disable All**: Deactivate all custom skills
- Active/total count displayed (e.g., 45/50)

## Manage Skills via AI

You can also ask Alpha to manage skills in chat:

- "Show me the list of available skills"
- "Is there a weather-related skill?"
- "Disable the healthcheck skill"
- "Find coding-related skills"

Alpha will use the `skill_skill_manager` tool automatically.

## Security Tiers

| Tier | Description | Approval |
|------|------------|----------|
| T0 | Read-only, no side effects | Auto-approved |
| T1 | Notification only | Notice shown |
| T2 | Caution required | User approval needed |
| T3 | Dangerous operation | User approval required |
