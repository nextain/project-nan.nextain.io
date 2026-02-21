Lorsque les outils sont activés, les avatars IA peuvent effectuer diverses tâches directement.

## Outils disponibles

| Outil | Fonction | Sécurité |
|------|----------|----------|
| execute_command | Exécuter des commandes de terminal | T3 |
| read_file | Lire le contenu des fichiers | T0 |
| write_file | Créer/modifier des fichiers | T2 |
| search_files | Rechercher dans le système de fichiers | T0 |
| web_search | Recherche Internet | T1 |
| apply_diff | Modifier des fichiers (appliquer un diff) | T2 |
| browser | Ouvrir des pages web | T1 |
| sessions_spawn | Créer des sous-agents | T2 |

## Exemples d'utilisation

Vous pouvez utiliser les outils via le langage naturel :

| Requête | Outil utilisé |
|---------|-----------|
| "Afficher les fichiers de ce dossier" | search_files |
| "Lire README.md" | read_file |
| "Exécuter git status" | execute_command |
| "Rechercher TypeScript" | web_search |
| "Examiner ce code" | sessions_spawn |

## Approbation de sécurité

Chaque outil nécessite une approbation basée sur son niveau de sécurité :

- **T0 (Lecture seule)** : Approuvé automatiquement — aucun effet secondaire
- **T1 (Notification)** : Notification affichée — accès externe mais sans modification
- **T2 (Attention)** : Approbation de l'utilisateur requise — modifications de fichiers, création d'agents
- **T3 (Dangereux)** : Approbation de l'utilisateur requise — exécution de commandes

Lors de la première approbation, la sélection de "Toujours autoriser" approuve automatiquement cet outil pour l'avenir. Vous pouvez réinitialiser les outils autorisés dans Paramètres > Outils.

## Connexion à la passerelle

Les outils nécessitent une connexion à une passerelle :

1. Activez **Activer les outils** dans Paramètres > Outils
2. Dans les environnements utilisateur normaux, les détails de connexion à la passerelle sont gérés automatiquement
3. Si les outils ne répondent pas, redémarrez l'application et réessayez
4. Vérifiez que les compétences requises sont activées dans l'onglet Compétences
5. Seules les configurations auto-hébergées/avancées nécessitent des vérifications manuelles d'URL/de jeton de passerelle