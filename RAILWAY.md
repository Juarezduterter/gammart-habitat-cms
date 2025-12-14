# Déploiement sur Railway

Ce guide vous aidera à déployer Gammart Habitat CMS sur Railway.

## Prérequis

1. Un compte Railway (https://railway.app/)
2. Un compte GitHub
3. Ce repository poussé sur GitHub

## Étapes de déploiement

### 1. Créer un nouveau projet sur Railway

1. Allez sur https://railway.app/
2. Cliquez sur "New Project"
3. Sélectionnez "Deploy from GitHub repo"
4. Choisissez le repository `gammart-habitat-cms`

### 2. Ajouter une base de données MongoDB

1. Dans votre projet Railway, cliquez sur "+ New"
2. Sélectionnez "Database" > "Add MongoDB"
3. Railway créera automatiquement la variable d'environnement `MONGO_URL`

### 3. Configurer les variables d'environnement

Dans l'onglet "Variables" de votre service, ajoutez :

```bash
# DATABASE (sera automatiquement ajouté par Railway)
DATABASE_URI=${{MongoDB.MONGO_URL}}

# PAYLOAD SECRET (générer avec: openssl rand -base64 32)
PAYLOAD_SECRET=votre_secret_ici

# NEXT_PUBLIC_SERVER_URL (l'URL de votre app Railway)
NEXT_PUBLIC_SERVER_URL=https://votre-app.up.railway.app

# CRON_SECRET (générer avec: openssl rand -base64 32)
CRON_SECRET=votre_cron_secret_ici

# PREVIEW_SECRET (générer avec: openssl rand -base64 32)
PREVIEW_SECRET=votre_preview_secret_ici
```

### 4. Déployer

Railway déploiera automatiquement votre application.

## Générer des secrets sécurisés

Pour générer des secrets sécurisés, utilisez :

```bash
openssl rand -base64 32
```

## Accéder à l'admin Payload

Une fois déployé, accédez à : `https://votre-app.up.railway.app/admin`

## Build et Start Commands

Railway détecte automatiquement les commandes via `package.json`:
- **Build**: `pnpm build`
- **Start**: `pnpm start`

## Troubleshooting

### Le build échoue

- Vérifiez que toutes les variables d'environnement sont définies
- Consultez les logs dans Railway

### Erreur de connexion MongoDB

- Vérifiez que `DATABASE_URI` est bien configuré avec `${{MongoDB.MONGO_URL}}`
- Assurez-vous que le service MongoDB est bien démarré

### Erreur 404 ou 500

- Vérifiez que `NEXT_PUBLIC_SERVER_URL` correspond à l'URL de votre app Railway
- Consultez les logs de l'application

## Support

Pour toute question, consultez :
- Documentation Payload CMS: https://payloadcms.com/docs
- Documentation Railway: https://docs.railway.app/
