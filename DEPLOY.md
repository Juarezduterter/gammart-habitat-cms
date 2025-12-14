# Guide de déploiement - Gammart Habitat CMS

## ✅ État du projet

Le projet est **prêt pour le déploiement** sur Railway !

### Ce qui a été fait :

- ✅ Build testé et validé en local
- ✅ Collections Payload CMS créées (Réalisations, Articles, etc.)
- ✅ Fichiers Docker supprimés
- ✅ Git initialisé avec un commit professionnel
- ✅ .env.example configuré pour Railway
- ✅ Documentation Railway.md créée
- ✅ Types TypeScript générés
- ✅ Dépendances vérifiées et installées

## 🚀 Prochaines étapes

### 1. Créer le repository GitHub

```bash
# Authentifiez-vous avec GitHub CLI
gh auth login

# Créez le repository (choisissez public ou private selon vos besoins)
gh repo create gammart-habitat-cms --source=. --public --push

# OU si vous préférez un repo privé:
gh repo create gammart-habitat-cms --source=. --private --push
```

### 2. Déployer sur Railway

1. Allez sur https://railway.app/
2. Cliquez sur "New Project"
3. Sélectionnez "Deploy from GitHub repo"
4. Choisissez `gammart-habitat-cms`
5. Ajoutez un service MongoDB :
   - Cliquez sur "+ New" > "Database" > "Add MongoDB"
6. Configurez les variables d'environnement (voir Railway.md)

### 3. Variables d'environnement Railway

Dans Railway, configurez :

```bash
DATABASE_URI=${{MongoDB.MONGO_URL}}
PAYLOAD_SECRET=<générer avec: openssl rand -base64 32>
NEXT_PUBLIC_SERVER_URL=https://votre-app.up.railway.app
CRON_SECRET=<générer avec: openssl rand -base64 32>
PREVIEW_SECRET=<générer avec: openssl rand -base64 32>
```

## 📋 Checklist finale

- [ ] Repository GitHub créé et poussé
- [ ] Projet Railway créé
- [ ] MongoDB ajouté sur Railway
- [ ] Variables d'environnement configurées
- [ ] Premier déploiement lancé
- [ ] Admin accessible à `https://votre-app.up.railway.app/admin`

## 🔧 Commandes utiles

```bash
# Développement local
pnpm dev

# Build de production
pnpm build

# Démarrer en production
pnpm start

# Générer les types TypeScript
pnpm generate:types
```

## 📚 Documentation

- [Railway.md](./RAILWAY.md) - Guide détaillé de déploiement Railway
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Railway Docs](https://docs.railway.app/)

## ⚠️ Important

- Ne commitez JAMAIS le fichier `.env` (il est dans .gitignore)
- Utilisez des secrets forts pour PAYLOAD_SECRET, CRON_SECRET, etc.
- Testez toujours en local avant de déployer

---

**Le projet est prêt !** Suivez les étapes ci-dessus pour déployer sur Railway.
