# Old Implementation Documentation

## Scope

### Application Purpose
This is a **public-facing website** for "Lægerne i Spinderiet" (The Doctors in Spinderiet), a medical clinic. The website serves as an informational platform for patients and visitors, providing details about the clinic, its staff, services, and practical information.

### Functional Scope

**Public Information Pages:**
- **Homepage** (`/`): Landing page with clinic overview
- **Lægerne** (`/laegerne`): Information about the doctors
- **Personale** (`/personale`): Information about clinic staff
- **Om klinikken** (`/om`): About the clinic
- **Speciallæger** (`/speciallaeger`): Information about specialist doctors
- **Priser for patienter** (`/priserpatient`): Patient pricing information
- **Vagtring** (`/vagtring`): On-call schedule and information
- **Øvelser og vejledninger** (`/oevelser`): Exercises and guidance materials
- **Priser på attester** (`/priserattester`): Certificate pricing
- **Problemer** (`/problemer`): Troubleshooting for e-consultation, prescription renewal, or appointment booking issues

**Administrative:**
- **Admin** (`/admin`): Redirects to Strapi CMS admin panel for content management

### Content Management
- All content is managed through **Strapi CMS** (headless CMS)
- Content editors can update pages without code changes
- Dynamic component-based content structure allows flexible page layouts
- Support for rich text (markdown), images, tables, and multi-column layouts

### Technical Scope

**In Scope:**
- Static site generation with ISR for fast performance
- Responsive design (mobile and desktop)
- SEO-friendly pages with proper meta tags
- Analytics tracking via Umami
- Image optimization with responsive formats
- Markdown content rendering
- Dynamic table generation from CMS data

**Out of Scope:**
- User authentication or login functionality
- Patient portal or appointment booking system
- Payment processing
- Real-time data or live updates (uses static generation)
- User-generated content or comments
- Search functionality
- Multi-language support

### Target Audience
- **Primary**: Patients and potential patients seeking clinic information
- **Secondary**: Clinic staff and administrators managing content

### Content Types Supported
- Hero/jumbotron sections with background images
- Two-column layouts (with optional asymmetric sizing)
- Full-width text content
- Dynamic tables with markdown support
- Rich text content with markdown formatting
- Responsive images with multiple format sizes

## Stack

### Core Technologies
- **Next.js**: 12.3.4 (React framework with SSR/SSG)
- **React**: 17.0.2
- **React DOM**: 17.0.2

### UI Framework
- **Bootstrap**: 4.6.0 (CSS framework)
- **React Bootstrap**: 1.5.2 (Bootstrap components for React)

### Content & Markdown
- **react-markdown**: 5.0.3 (Markdown rendering)

### Backend/CMS
- **Strapi CMS**: Headless CMS (backend API at `spinderietapi.4a4b.dk`)
  - Content fetched via REST API
  - Dynamic component-based content structure
  - Image/media management with responsive formats

### Analytics
- **Umami**: Analytics tracking (script loaded from `umami.4a4b.dk`)

### Deployment
- **Docker**: Multi-stage build for production
- **CapRover**: Container orchestration (based on Dockerfile configuration)

## Architecture

### Overview
This is a **Next.js static site** that uses **Incremental Static Regeneration (ISR)** to fetch content from a Strapi CMS backend. The architecture follows a component-based, CMS-driven approach where page content is dynamically rendered based on component types returned from the API.

### Data Flow

1. **Build Time (Static Generation)**:
   - Each page uses `getStaticProps()` to fetch content from Strapi API
   - Content is fetched at build time and cached
   - ISR with `revalidate: 1` enables content updates every second

2. **API Integration**:
   - Base URL: `NEXT_PUBLIC_API_URL` environment variable (defaults to `http://localhost:1337/`)
   - API endpoint pattern: `{BASE_URL}{page-slug}` (e.g., `frontpage`, `laegerne`, `personale`)
   - Returns JSON with `content` array containing component definitions

3. **Component Rendering**:
   - `PageContent` component receives array of content elements
   - Each element has `__component` field (e.g., `content.jumbo`, `content.col2`, `content.fullwidth`, `content.table`)
   - Components are dynamically rendered based on `__component` type

### Page Structure

All pages follow a consistent pattern:

```javascript
// Standard page structure
export default function PageName(props) {
    const title = "Page Title"
    return <BasePage title={title} content={props.content}/>
}

export async function getStaticProps() {
    return apiGetStaticProps("page-slug")
}
```

### Routing

**File-based routing** (Next.js pages directory):
- `/` → `pages/index.js` (frontpage)
- `/laegerne` → `pages/laegerne.js`
- `/personale` → `pages/personale.js`
- `/om` → `pages/om.js`
- `/speciallaeger` → `pages/speciallaeger.js`
- `/priserpatient` → `pages/priserpatient.js`
- `/vagtring` → `pages/vagtring.js`
- `/oevelser` → `pages/oevelser.js`
- `/priserattester` → `pages/priserattester.js`
- `/problemer` → `pages/problemer.js`
- `/admin` → `pages/admin.js` (redirects to Strapi admin panel)

### Component Architecture

#### Layout Components

**BasePage** (`components/BasePage.js`):
- Main layout wrapper for all pages
- Includes `<Head>` for SEO (title, favicon)
- Renders `TopBar` navigation
- Renders `PageContent` with CMS content
- Empty footer section

**TopBar** (`components/TopBar.js`):
- Bootstrap Navbar with responsive collapse
- Brand: "Lægerne i Spinderiet" (links to home)
- Navigation links:
  - Lægerne
  - Personale
  - Dropdown: "Praktisk information"
    - Om klinikken
    - Speciallæger
    - Priser for patienter
    - Vagtring
    - Øvelser og vejledninger
    - Priser på attester
    - Problemer med e-konsultation/receptfornyelse eller tidsbestilling

**PageContent** (`components/PageContent.js`):
- Dynamic component renderer
- Maps over content array from CMS
- Renders components based on `__component` type:
  - `content.jumbo` → `<Jumbo>`
  - `content.col2` → `<Cols2>`
  - `content.fullwidth` → `<Fullwidth>`
  - `content.table` → `<CMSTable>`

#### Content Components

**Jumbo** (`components/Jumbo.js`):
- Hero/jumbotron component with background image
- Responsive image selection based on window width
- Uses `resolveImage()` to select appropriate image format (small/medium/large/xlarge)
- Responsive padding (40% on desktop, 60% on mobile)
- Background image from Strapi media

**Cols2** (`components/Cols2.js`):
- Two-column layout component
- Desktop: Side-by-side columns (6/6 or 8/4, 4/8 based on `big` prop)
- Mobile (< 992px): Stacked layout with navigation buttons
- Supports optional titles for each column (`lefttitle`, `righttitle`)
- Renders markdown content in each column

**Fullwidth** (`components/Fullwidth.js`):
- Full-width content container
- Single column layout
- Renders markdown text content

**CMSTable** (`components/CMSTable.js`):
- Dynamic table component
- Parses headers and content from CMS string format:
  - Headers: pipe-separated string (e.g., "Header1|Header2|Header3;")
  - Content: semicolon-separated rows, pipe-separated cells
- Supports `striped` and `compact` props
- Renders markdown in cells

**MarkDown** (`components/MarkDown.js`):
- Markdown renderer using `react-markdown`
- Custom image handling:
  - Parses dimensions from alt text: `"alt text=widthxheight"`
  - Applies responsive width constraints
  - Replaces `/uploads/` paths with full API URL
  - Handles `<br>` tags conversion
  - Uses MutationObserver for dynamic image styling
  - Large images (>500px) rendered as block, smaller as inline-block

### API Layer

**api/api.js**:
- `BASE_URL`: Constructs API base URL from environment variable
  - Adds protocol if missing
  - Ensures trailing slash
- `getStrapiMedia()`: Converts relative media URLs to absolute URLs
- `apiGet(url)`: Fetches JSON from API endpoint
- `apiGetStaticProps(url)`: Wraps `apiGet` for Next.js static props
  - Returns `{ props: {...json}, revalidate: 1 }`

**api/window.js**:
- `useWindow(setWindowWidth)`: React hook for window width tracking
  - Updates on resize events
  - Used for responsive image selection
- `resolveImage(imageWidth, imageurl)`: Selects appropriate image format
  - ≤640px: `small` format
  - ≤768px: `medium` format
  - ≤1024px: `large` format
  - ≤1920px: `xlarge` format
  - >1920px: original format

### Utilities

**util/util.js**:
- `trimEndCharFromString(str, character)`: Removes trailing character from string
  - Used for parsing CMS table data (removes trailing semicolons)

### Styling

**styles/globals.css**:
- Global CSS reset and base styles
- Bootstrap column layout fixes
- Image sizing rules based on alt attribute patterns:
  - `img[alt*="=200"]`, `=300`, `=400`, `=500` selectors
  - Explicit width constraints for responsive images
  - Fallback to `data-width` attribute
- Word-wrap and overflow handling for columns

### Environment Configuration

**Environment Variables**:
- `NEXT_PUBLIC_API_URL`: Strapi CMS API base URL
  - Default: `http://localhost:1337/`
  - Production: `https://spinderietapi.4a4b.dk/`

### Deployment

**Dockerfile**:
- Multi-stage build (deps → builder → runner)
- Node.js 18 Alpine base image
- Supports both ARG and ENV for `NEXT_PUBLIC_API_URL`
- Runs as non-root user (nextjs)
- Exposes port 3000
- Production build with `yarn build` and `yarn start`

### Key Patterns

1. **CMS-Driven Content**: All page content is fetched from Strapi and rendered dynamically
2. **Component-Based**: Content elements are mapped to React components
3. **Static Generation**: Pages are pre-rendered at build time with ISR
4. **Responsive Design**: Bootstrap grid system with custom responsive image handling
5. **Markdown Support**: Rich text content rendered as markdown with custom image handling
6. **Type Safety**: Minimal - relies on runtime component type checking via `__component` field

### Limitations & Technical Debt

1. **No TypeScript**: Pure JavaScript implementation
2. **Runtime Component Mapping**: Component selection via string matching (`__component.split(".")[1]`)
3. **Console Logging**: Debug logs present in production code (`BasePage.js`, `PageContent.js`)
4. **Hardcoded URLs**: Admin redirect URL hardcoded in `admin.js`
5. **Image Handling Complexity**: Multiple layers of image sizing (CSS, inline styles, data attributes)
6. **No Error Boundaries**: No React error boundary implementation
7. **Hydration Mismatches**: Some components handle SSR/client differences manually (e.g., `Cols2`)
