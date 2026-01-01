# Reimplementation Scope (Svelte 5 + Drizzle + PostgreSQL)

## Technology Stack Migration

**Frontend:**
- **SvelteKit 5**: Modern full-stack framework replacing Next.js
- **Svelte 5**: Component framework with runes and improved reactivity
- **TypeScript**: Type safety throughout the application
- **Tailwind CSS** (recommended) or **CSS Modules**: Modern styling approach

**Backend & Database:**
- **Drizzle ORM**: Type-safe database queries and migrations
- **PostgreSQL**: Relational database replacing Strapi's data layer
- **SvelteKit API Routes**: Server-side endpoints for CMS operations
- **Node.js Runtime**: Server-side JavaScript execution

**CMS Implementation:**
- **Custom CMS Backend**: Simple, targeted CMS built specifically for this use case
- **Rich WYSIWYG Editor**: Integrated editor supporting:
  - Rich text formatting (bold, italic, headings, lists, links)
  - Image upload and embedding
  - Table creation and editing
  - Inline styling capabilities
  - Content preview functionality
- **Media Management**: Image upload, storage, and optimization system
- **Component-Based Content**: Maintain dynamic component structure (jumbo, col2, fullwidth, table)

## Functional Requirements

### Public Website (Preserved)
- All existing public pages must be maintained with identical functionality
- Same routing structure and URLs
- Responsive design for mobile and desktop
- SEO optimization with proper meta tags
- Analytics integration (Umami or alternative)

### CMS Admin Interface (New Implementation)
- **Authentication System**: Secure login for content editors
- **Page Management**: 
  - Create, edit, and delete pages
  - Manage page slugs and metadata
  - Preview functionality before publishing
- **Content Editor**:
  - WYSIWYG editor for rich text content
  - Drag-and-drop or component selector for adding content blocks
  - Support for all existing component types:
    - Hero/jumbotron with image upload
    - Two-column layouts with optional titles
    - Full-width text blocks
    - Dynamic tables with rich text cells
  - Image upload and management:
    - Upload images directly in editor
    - Image optimization and format generation (small, medium, large, xlarge)
    - Image library/browser for reusing uploaded images
    - Alt text and dimension specification
- **Media Library**: 
  - Browse and manage uploaded images
  - Delete unused images
  - Image metadata (alt text, dimensions, formats)
- **Content Versioning** (optional): Draft/published states for content

## Database Schema Requirements

### Core Tables
- `pages`: Page metadata (slug, title, published status, created/updated timestamps)
- `content_blocks`: Reusable content block definitions
- `page_content`: Junction table linking pages to content blocks with ordering
- `media`: Image and file metadata (filename, path, formats, alt text, dimensions)
- `users`: CMS admin users (username, password hash, role)
- `sessions`: User authentication sessions

### Content Block Types
- `jumbo`: Hero section (image reference, text content)
- `col2`: Two-column layout (left content, right content, titles, sizing)
- `fullwidth`: Full-width text block
- `table`: Table data (headers, rows, styling options)

## Technical Implementation Details

### Architecture
- **Full-Stack SvelteKit**: Single codebase for frontend and backend
- **Server-Side Rendering (SSR)**: Initial page load from server
- **Static Generation**: Pre-render pages at build time where possible
- **API Routes**: RESTful endpoints for CMS operations (`/api/admin/*`)
- **Database Migrations**: Drizzle migrations for schema versioning

### Content Rendering
- Dynamic component rendering based on database content
- Server-side content fetching in SvelteKit load functions
- Client-side reactivity for admin interface
- Type-safe content structures using TypeScript

### Image Handling
- Image upload to server storage (filesystem or cloud storage)
- Image optimization pipeline (generate multiple formats/sizes)
- Responsive image serving based on viewport
- CDN-ready image URLs

### Security
- Authentication middleware for admin routes
- Password hashing (bcrypt or similar)
- CSRF protection for form submissions
- Input validation and sanitization
- SQL injection prevention via Drizzle ORM

## Migration Considerations

### Data Migration
- Export existing Strapi content to structured format (JSON)
- Map Strapi component types to new database schema
- Migrate media files and update references
- Preserve all existing page content and structure

### URL Preservation
- Maintain exact same URL structure (`/laegerne`, `/personale`, etc.)
- Ensure no broken links or redirects needed
- Preserve SEO value of existing URLs

### Feature Parity
- All existing component types must be supported
- Same responsive behavior and styling
- Same markdown rendering capabilities
- Same image optimization and responsive formats

## Out of Scope (For Initial Implementation)

- Multi-user roles/permissions (single admin role sufficient)
- Content approval workflows
- Scheduled publishing
- Content history/rollback (can be added later)
- Multi-language support
- Advanced search functionality
- Real-time collaboration in editor
- External API integrations beyond analytics

## Development Phases (Recommended)

### Phase 1: Foundation
- Set up SvelteKit project with TypeScript
- Configure Drizzle ORM with PostgreSQL
- Create database schema and migrations
- Implement authentication system

### Phase 2: Public Website
- Recreate all public pages
- Implement content rendering components
- Set up routing and SSR
- Migrate existing content

### Phase 3: CMS Backend
- Build admin API routes
- Implement media upload and management
- Create database operations for content CRUD

### Phase 4: CMS Frontend
- Build admin login interface
- Integrate WYSIWYG editor
- Create page management UI
- Build content block editor interface
- Implement media library

### Phase 5: Polish & Migration
- Content migration from Strapi
- Testing and bug fixes
- Performance optimization
- Deployment and DNS cutover

