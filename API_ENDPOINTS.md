# API Endpoints - Gammart Habitat CMS

Ce document liste tous les endpoints API disponibles pour votre frontend Next.js.

**Base URL (Production):** `https://gammart-habitat-cms-production.up.railway.app`
**Base URL (Local):** `http://localhost:3000`

---

## 📋 Table des matières

- [Endpoints REST API](#endpoints-rest-api)
- [GraphQL Endpoint](#graphql-endpoint)
- [Endpoints de santé](#endpoints-de-santé)
- [Globals](#globals)
- [Exemples d'utilisation](#exemples-dutilisation)

---

## Endpoints REST API

Payload CMS génère automatiquement des endpoints REST pour chaque collection.

### Collections disponibles

#### 📄 Pages
```
GET    /api/pages              # Liste toutes les pages
GET    /api/pages/:id          # Récupère une page par ID
GET    /api/pages/slug/:slug   # Récupère une page par slug
POST   /api/pages              # Crée une page (nécessite auth)
PATCH  /api/pages/:id          # Met à jour une page (nécessite auth)
DELETE /api/pages/:id          # Supprime une page (nécessite auth)
```

#### 🖼️ Media
```
GET    /api/media              # Liste tous les médias
GET    /api/media/:id          # Récupère un média par ID
POST   /api/media              # Upload un média (nécessite auth)
PATCH  /api/media/:id          # Met à jour un média (nécessite auth)
DELETE /api/media/:id          # Supprime un média (nécessite auth)
```

#### 🏗️ Réalisations
```
GET    /api/realisations              # Liste toutes les réalisations
GET    /api/realisations/:id          # Récupère une réalisation par ID
GET    /api/realisations/slug/:slug   # Récupère une réalisation par slug
POST   /api/realisations              # Crée une réalisation (nécessite auth)
PATCH  /api/realisations/:id          # Met à jour une réalisation (nécessite auth)
DELETE /api/realisations/:id          # Supprime une réalisation (nécessite auth)
```

#### 📝 Articles (Blog)
```
GET    /api/articles              # Liste tous les articles
GET    /api/articles/:id          # Récupère un article par ID
GET    /api/articles/slug/:slug   # Récupère un article par slug
POST   /api/articles              # Crée un article (nécessite auth)
PATCH  /api/articles/:id          # Met à jour un article (nécessite auth)
DELETE /api/articles/:id          # Supprime un article (nécessite auth)
```

#### 📍 Zones
```
GET    /api/zones         # Liste toutes les zones
GET    /api/zones/:id     # Récupère une zone par ID
```

#### 🛠️ Types de Travaux
```
GET    /api/types-travaux         # Liste tous les types de travaux
GET    /api/types-travaux/:id     # Récupère un type par ID
```

#### 🏷️ Catégories Blog
```
GET    /api/categories-blog         # Liste toutes les catégories
GET    /api/categories-blog/:id     # Récupère une catégorie par ID
```

#### 🔖 Tags Blog
```
GET    /api/tags-blog         # Liste tous les tags
GET    /api/tags-blog/:id     # Récupère un tag par ID
```

#### 👤 Users
```
GET    /api/users         # Liste tous les utilisateurs (nécessite auth)
GET    /api/users/:id     # Récupère un utilisateur par ID (nécessite auth)
```

---

## GraphQL Endpoint

### Endpoint GraphQL
```
POST   /api/graphql              # Endpoint GraphQL
```

### GraphQL Playground
```
GET    /api/graphql-playground   # Interface de test GraphQL
```

**URL du playground:** `https://gammart-habitat-cms-production.up.railway.app/api/graphql-playground`

---

## Endpoints de santé

### Health Check
```
GET    /api/health               # Health check (ne nécessite pas de BDD)
```

**Exemple de réponse:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-16T11:00:00.000Z",
  "uptime": 123.45
}
```

---

## Globals

Les globals sont des données singleton (une seule instance) accessibles via l'API.

### Header
```
GET    /api/globals/header       # Récupère la configuration du header
```

### Footer
```
GET    /api/globals/footer       # Récupère la configuration du footer
```

### Paramètres Réalisations
```
GET    /api/globals/parametres-realisations  # Récupère les paramètres
```

### Paramètres Blog
```
GET    /api/globals/parametres-blog          # Récupère les paramètres
```

---

## Exemples d'utilisation

### 1. Récupérer toutes les pages

```typescript
const response = await fetch('https://gammart-habitat-cms-production.up.railway.app/api/pages')
const data = await response.json()

console.log(data.docs) // Array de pages
```

### 2. Récupérer une page par slug

```typescript
const response = await fetch(
  'https://gammart-habitat-cms-production.up.railway.app/api/pages?where[slug][equals]=about'
)
const data = await response.json()

console.log(data.docs[0]) // Page "about"
```

### 3. Récupérer les articles avec pagination

```typescript
const response = await fetch(
  'https://gammart-habitat-cms-production.up.railway.app/api/articles?limit=10&page=1'
)
const data = await response.json()

console.log(data.docs)        // Array d'articles
console.log(data.totalDocs)   // Nombre total d'articles
console.log(data.hasNextPage) // Boolean
```

### 4. Filtrer les réalisations par zone

```typescript
const response = await fetch(
  'https://gammart-habitat-cms-production.up.railway.app/api/realisations?where[zone][equals]=ZONE_ID'
)
const data = await response.json()

console.log(data.docs) // Réalisations de cette zone
```

### 5. Récupérer le header global

```typescript
const response = await fetch(
  'https://gammart-habitat-cms-production.up.railway.app/api/globals/header'
)
const data = await response.json()

console.log(data) // Configuration du header
```

### 6. Utiliser GraphQL

```typescript
const query = `
  query {
    Articles(limit: 10) {
      docs {
        id
        title
        slug
        publishedAt
      }
    }
  }
`

const response = await fetch(
  'https://gammart-habitat-cms-production.up.railway.app/api/graphql',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }
)

const data = await response.json()
console.log(data.data.Articles.docs)
```

---

## 🔒 Authentification

Certains endpoints nécessitent une authentification (POST, PATCH, DELETE).

### Login
```
POST   /api/users/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Réponse:**
```json
{
  "token": "jwt_token_here",
  "user": { ... }
}
```

Ensuite, utilisez le token dans les headers:
```typescript
headers: {
  'Authorization': `JWT ${token}`
}
```

---

## 📚 Paramètres de requête disponibles

Tous les endpoints GET supportent ces paramètres:

- `?limit=10` - Limite le nombre de résultats
- `?page=1` - Pagination
- `?sort=-createdAt` - Tri (- pour décroissant)
- `?where[field][equals]=value` - Filtrage
- `?where[field][contains]=value` - Recherche partielle
- `?depth=1` - Profondeur de population des relations

**Exemple complet:**
```
/api/articles?limit=10&page=1&sort=-publishedAt&where[status][equals]=published&depth=2
```

---

## 🔗 Documentation complète

Pour plus de détails sur l'API REST de Payload CMS:
- [Payload REST API Docs](https://payloadcms.com/docs/rest-api/overview)
- [Payload GraphQL Docs](https://payloadcms.com/docs/graphql/overview)

---

## 🎯 Utilisation dans votre Frontend Next.js

Pour votre site web Next.js qui consomme ce CMS, vous pouvez :

1. **Créer un client API** dans votre frontend:

```typescript
// lib/api.ts
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'

export async function getPages() {
  const res = await fetch(`${CMS_URL}/api/pages`)
  return res.json()
}

export async function getPageBySlug(slug: string) {
  const res = await fetch(`${CMS_URL}/api/pages?where[slug][equals]=${slug}`)
  const data = await res.json()
  return data.docs[0]
}

export async function getArticles(limit = 10, page = 1) {
  const res = await fetch(`${CMS_URL}/api/articles?limit=${limit}&page=${page}&sort=-publishedAt`)
  return res.json()
}

export async function getHeader() {
  const res = await fetch(`${CMS_URL}/api/globals/header`)
  return res.json()
}
```

2. **Utiliser dans vos pages Next.js:**

```typescript
// app/blog/page.tsx
import { getArticles } from '@/lib/api'

export default async function BlogPage() {
  const { docs: articles } = await getArticles()

  return (
    <div>
      {articles.map(article => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

---

**Note:** N'oubliez pas de configurer `NEXT_PUBLIC_CMS_URL` dans votre frontend avec l'URL de votre CMS Railway.
