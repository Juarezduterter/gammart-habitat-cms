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

### 4. Configurer le Health Check

**Important :** Railway utilise un health check pour vérifier que votre application est prête à recevoir du trafic.

1. Dans votre service Railway, allez dans **Settings** → **Deploy**
2. Dans la section **Health Check**, configurez :
   - **Health Check Path**: `/api/health`
   - **Health Check Timeout**: 300 seconds (ou laissez par défaut)

⚠️ **N'utilisez PAS `/admin` comme health check path** car cette route nécessite une connexion à la base de données et peut échouer au démarrage.

L'endpoint `/api/health` est un endpoint simple qui répond immédiatement sans dépendre de la base de données.

### 5. Déployer

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

### Le build échoue avec "MongoServerError: Command find requires authentication"

**Ce problème a été résolu automatiquement dans le code.**

L'application gère maintenant gracieusement l'absence de connexion à la base de données pendant le build. Les pages seront générées dynamiquement (SSR) au runtime au lieu d'être pré-générées au moment du build.

**Note importante:** Sur Railway, la variable `DATABASE_URI` n'est disponible qu'au runtime (pendant l'exécution), pas pendant le build. C'est un comportement normal et l'application fonctionne correctement avec cette configuration.

### Le build échoue pour d'autres raisons

- Vérifiez que `PAYLOAD_SECRET` est bien défini (requis pour le build)
- Consultez les logs dans Railway pour identifier l'erreur spécifique

### Erreur de connexion MongoDB au runtime

- Vérifiez que `DATABASE_URI` est bien configuré avec `${{MongoDB.MONGO_URL}}`
- Assurez-vous que le service MongoDB est bien démarré
- Vérifiez que les deux services (MongoDB et votre app) sont dans le même projet Railway

### "Application failed to respond"

Ce problème peut avoir plusieurs causes:
1. **Health check incorrect:** Si le health check est configuré sur `/admin`, il échouera car cette route dépend de la base de données. **Solution:** Configurez le health check sur `/api/health` (voir section "Configurer le Health Check").
2. **Port incorrect:** L'application doit écouter sur le port fourni par Railway (`$PORT`). Ceci est déjà configuré dans `package.json` avec `-p ${PORT:-3000}`.
3. **Délai de démarrage:** L'application peut prendre quelques secondes à démarrer. Attendez 30-60 secondes après le déploiement.
4. **Erreur au démarrage:** Consultez les logs de déploiement pour identifier l'erreur.

### Erreur 404 ou 500

- Vérifiez que `NEXT_PUBLIC_SERVER_URL` correspond à l'URL de votre app Railway (sans slash à la fin)
- Vérifiez que `DATABASE_URI` est correctement configuré
- Consultez les logs de l'application pour plus de détails

## Support

Pour toute question, consultez :
- Documentation Payload CMS: https://payloadcms.com/docs
- Documentation Railway: https://docs.railway.app/
