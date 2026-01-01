# Reimplementation ToDo List

## Phase 1: Foundation

### Project Setup
- [ ] Initialize SvelteKit project with TypeScript
- [ ] Configure TypeScript with strict mode
- [ ] Set up project structure (lib, routes, components directories)
- [ ] Configure ESLint and Prettier
- [ ] Set up Git repository and initial commit
- [ ] Create `.env.example` file with required environment variables
- [ ] Set up `.env` for local development

### Database Setup
- [ ] Install and configure PostgreSQL (local development)
- [ ] Install Drizzle ORM and PostgreSQL driver
- [ ] Create Drizzle configuration file
- [ ] Set up database connection string in environment variables
- [ ] Create initial database migration structure
- [ ] Test database connection

### Database Schema Design
- [ ] Design `users` table schema (id, username, password_hash, role, created_at, updated_at)
- [ ] Design `sessions` table schema (id, user_id, token, expires_at, created_at)
- [ ] Design `pages` table schema (id, slug, title, published, created_at, updated_at)
- [ ] Design `content_blocks` table schema (id, type, data (JSONB), created_at, updated_at)
- [ ] Design `page_content` junction table (id, page_id, block_id, order_index, created_at)
- [ ] Design `media` table schema (id, filename, path, formats (JSONB), alt_text, width, height, alt_text, created_at, updated_at)
- [ ] Create Drizzle schema definitions for all tables
- [ ] Add foreign key constraints and indexes
- [ ] Create initial migration file
- [ ] Run migration and verify schema creation

### Authentication System
- [ ] Install bcrypt for password hashing
- [ ] Create password hashing utility functions
- [ ] Create session management utilities
- [ ] Implement user registration endpoint (optional, or seed initial admin)
- [ ] Implement login endpoint (`/api/admin/login`)
- [ ] Implement logout endpoint (`/api/admin/logout`)
- [ ] Create authentication middleware for protected routes
- [ ] Create session validation utility
- [ ] Test authentication flow

### Development Environment
- [ ] Set up development scripts in package.json
- [ ] Configure hot reload for development
- [ ] Set up database seeding script (optional test data)
- [ ] Create README with setup instructions
- [ ] Document environment variables

---

## Phase 2: Public Website

### Routing Setup
- [ ] Configure SvelteKit routing structure
- [ ] Create route for homepage (`/`)
- [ ] Create route for `/laegerne`
- [ ] Create route for `/personale`
- [ ] Create route for `/om`
- [ ] Create route for `/speciallaeger`
- [ ] Create route for `/priserpatient`
- [ ] Create route for `/vagtring`
- [ ] Create route for `/oevelser`
- [ ] Create route for `/priserattester`
- [ ] Create route for `/problemer`
- [ ] Ensure all routes match existing URL structure exactly

### Database Queries for Public Pages
- [ ] Create function to fetch page by slug
- [ ] Create function to fetch page content blocks with ordering
- [ ] Create function to fetch media by ID
- [ ] Add error handling for missing pages
- [ ] Test database queries

### Layout Components
- [ ] Create `BasePage.svelte` layout component
- [ ] Create `TopBar.svelte` navigation component
- [ ] Implement responsive navigation menu
- [ ] Add all navigation links (Lægerne, Personale, dropdown menu)
- [ ] Create footer component (if needed)
- [ ] Implement SEO meta tags in layout
- [ ] Add favicon support

### Content Rendering Components
- [ ] Create `PageContent.svelte` component for dynamic content rendering
- [ ] Create `Jumbo.svelte` component (hero section)
  - [ ] Implement background image display
  - [ ] Add responsive image selection logic
  - [ ] Implement responsive padding
- [ ] Create `Cols2.svelte` component (two-column layout)
  - [ ] Implement desktop side-by-side layout
  - [ ] Implement mobile stacked layout
  - [ ] Add support for asymmetric column sizing
  - [ ] Add optional column titles
- [ ] Create `Fullwidth.svelte` component
- [ ] Create `CMSTable.svelte` component
  - [ ] Parse table headers and rows
  - [ ] Support striped and compact options
  - [ ] Render markdown in cells
- [ ] Create component type mapping logic

### Markdown Rendering
- [ ] Install markdown rendering library (e.g., marked, markdown-it)
- [ ] Create `MarkDown.svelte` component
- [ ] Implement custom image rendering with dimension parsing
- [ ] Handle alt text format: `"alt text=widthxheight"`
- [ ] Implement image URL replacement (`/uploads/` → full URL)
- [ ] Handle `<br>` tag conversion
- [ ] Add support for responsive image sizing
- [ ] Test markdown rendering with various content

### Image Handling
- [ ] Create image optimization utility functions
- [ ] Implement responsive image format selection (small, medium, large, xlarge)
- [ ] Create image URL generation utilities
- [ ] Implement viewport-based image selection
- [ ] Add image lazy loading support

### Styling
- [ ] Choose and configure CSS framework (Tailwind CSS recommended)
- [ ] Set up global styles
- [ ] Implement responsive design breakpoints
- [ ] Style navigation bar
- [ ] Style content components
- [ ] Ensure mobile responsiveness
- [ ] Match existing design as closely as possible

### Analytics Integration
- [ ] Integrate Umami analytics script
- [ ] Add analytics configuration
- [ ] Test analytics tracking

### Load Functions
- [ ] Create load function for homepage
- [ ] Create load function for each public page
- [ ] Implement server-side data fetching
- [ ] Add error handling for missing pages (404)
- [ ] Implement caching strategy
- [ ] Test SSR functionality

### Testing Public Pages
- [ ] Test all routes render correctly
- [ ] Test SSR and client-side navigation
- [ ] Test responsive design on mobile and desktop
- [ ] Verify all content components render properly
- [ ] Test markdown rendering
- [ ] Test image loading and optimization

---

## Phase 3: CMS Backend

### API Route Structure
- [ ] Create `/api/admin` route group
- [ ] Set up authentication middleware for admin routes
- [ ] Create error handling utilities for API routes
- [ ] Implement CORS configuration if needed

### Authentication API Routes
- [ ] Create `POST /api/admin/login` endpoint
- [ ] Create `POST /api/admin/logout` endpoint
- [ ] Create `GET /api/admin/me` endpoint (current user info)
- [ ] Add input validation for login
- [ ] Add rate limiting for login attempts
- [ ] Test authentication endpoints

### Page Management API Routes
- [ ] Create `GET /api/admin/pages` endpoint (list all pages)
- [ ] Create `GET /api/admin/pages/[slug]` endpoint (get single page)
- [ ] Create `POST /api/admin/pages` endpoint (create page)
- [ ] Create `PUT /api/admin/pages/[id]` endpoint (update page)
- [ ] Create `DELETE /api/admin/pages/[id]` endpoint (delete page)
- [ ] Add input validation for page operations
- [ ] Add slug uniqueness validation
- [ ] Test all page CRUD operations

### Content Block API Routes
- [ ] Create `GET /api/admin/blocks/[id]` endpoint
- [ ] Create `POST /api/admin/blocks` endpoint (create block)
- [ ] Create `PUT /api/admin/blocks/[id]` endpoint (update block)
- [ ] Create `DELETE /api/admin/blocks/[id]` endpoint (delete block)
- [ ] Create `POST /api/admin/pages/[id]/blocks` endpoint (add block to page)
- [ ] Create `PUT /api/admin/pages/[id]/blocks/order` endpoint (reorder blocks)
- [ ] Create `DELETE /api/admin/pages/[id]/blocks/[blockId]` endpoint (remove block from page)
- [ ] Add validation for block types and data
- [ ] Test all content block operations

### Media Management API Routes
- [ ] Create `GET /api/admin/media` endpoint (list all media)
- [ ] Create `GET /api/admin/media/[id]` endpoint (get single media)
- [ ] Create `POST /api/admin/media/upload` endpoint (upload image)
- [ ] Create `DELETE /api/admin/media/[id]` endpoint (delete media)
- [ ] Create `PUT /api/admin/media/[id]` endpoint (update media metadata)
- [ ] Implement file upload handling (multipart/form-data)
- [ ] Add file type validation (images only)
- [ ] Add file size limits
- [ ] Test media upload and management

### Image Processing
- [ ] Install image processing library (e.g., sharp)
- [ ] Create image optimization service
- [ ] Implement format generation (small, medium, large, xlarge)
- [ ] Store original and optimized images
- [ ] Generate image metadata (dimensions, formats)
- [ ] Create image storage structure
- [ ] Test image processing pipeline

### Database Operations Layer
- [ ] Create database service for pages
- [ ] Create database service for content blocks
- [ ] Create database service for page content relationships
- [ ] Create database service for media
- [ ] Create database service for users
- [ ] Add transaction support for complex operations
- [ ] Add error handling and logging
- [ ] Test all database operations

### Input Validation & Sanitization
- [ ] Create validation schemas for page data
- [ ] Create validation schemas for content block data
- [ ] Create validation schemas for media metadata
- [ ] Implement input sanitization utilities
- [ ] Add XSS protection
- [ ] Test validation and sanitization

### Security Implementation
- [ ] Implement CSRF protection
- [ ] Add rate limiting for API routes
- [ ] Secure file upload paths
- [ ] Validate file uploads (type, size)
- [ ] Implement secure session management
- [ ] Add security headers
- [ ] Test security measures

---

## Phase 4: CMS Frontend

### Admin Layout
- [ ] Create admin layout component
- [ ] Create admin navigation/sidebar
- [ ] Add admin route protection (redirect if not authenticated)
- [ ] Create admin dashboard page
- [ ] Style admin interface

### Authentication UI
- [ ] Create login page (`/admin/login`)
- [ ] Create login form component
- [ ] Add form validation
- [ ] Implement login error handling
- [ ] Add loading states
- [ ] Handle successful login redirect
- [ ] Test login flow

### Page Management UI
- [ ] Create pages list view (`/admin/pages`)
- [ ] Create page creation form
- [ ] Create page edit form
- [ ] Add page deletion confirmation
- [ ] Implement page preview functionality
- [ ] Add page status indicators (published/draft)
- [ ] Add search/filter functionality (optional)
- [ ] Test page management interface

### Content Editor
- [ ] Research and select WYSIWYG editor library (e.g., Tiptap, Quill, TinyMCE)
- [ ] Install and configure WYSIWYG editor
- [ ] Create rich text editor component
- [ ] Implement toolbar with formatting options (bold, italic, headings, lists, links)
- [ ] Add table creation/editing support
- [ ] Integrate image upload in editor
- [ ] Add content preview mode
- [ ] Implement save functionality
- [ ] Add auto-save (optional)
- [ ] Test editor functionality

### Content Block Management
- [ ] Create content block selector/adder UI
- [ ] Create Jumbo block editor
  - [ ] Image upload/selection
  - [ ] Text content editor
- [ ] Create Col2 block editor
  - [ ] Left/right content editors
  - [ ] Title inputs
  - [ ] Column sizing options
- [ ] Create Fullwidth block editor
- [ ] Create Table block editor
  - [ ] Table builder interface
  - [ ] Add/remove rows and columns
  - [ ] Cell content editing
  - [ ] Table styling options
- [ ] Implement block reordering (drag-and-drop or up/down buttons)
- [ ] Add block deletion
- [ ] Test all block editors

### Media Library
- [ ] Create media library page (`/admin/media`)
- [ ] Implement image grid/list view
- [ ] Add image upload interface
- [ ] Create image upload component with drag-and-drop
- [ ] Add image preview functionality
- [ ] Create image metadata editor (alt text, etc.)
- [ ] Implement image deletion with confirmation
- [ ] Add image search/filter (optional)
- [ ] Create image picker modal for use in editors
- [ ] Test media library

### Image Upload Integration
- [ ] Integrate image upload in WYSIWYG editor
- [ ] Integrate image upload in block editors
- [ ] Add image selection from media library
- [ ] Implement image dimension specification UI
- [ ] Add alt text input for images
- [ ] Test image upload and embedding

### Admin UI Polish
- [ ] Add loading states throughout admin interface
- [ ] Add error messages and notifications
- [ ] Add success confirmations
- [ ] Implement responsive design for admin
- [ ] Add keyboard shortcuts (optional)
- [ ] Improve UX with better feedback
- [ ] Test complete admin workflow

---

## Phase 5: Polish & Migration

### Content Migration
- [ ] Export all Strapi content to JSON format
- [ ] Create migration script to import Strapi data
- [ ] Map Strapi component types to new schema
- [ ] Migrate all pages and content blocks
- [ ] Download and migrate all media files
- [ ] Update image references in content
- [ ] Verify all content migrated correctly
- [ ] Test migrated content on public pages

### URL Preservation
- [ ] Verify all routes match existing URLs exactly
- [ ] Test all public page URLs
- [ ] Ensure no 404 errors for existing URLs
- [ ] Set up redirects if any URLs changed (shouldn't be needed)
- [ ] Verify SEO meta tags are preserved

### Feature Parity Testing
- [ ] Compare all component types with old implementation
- [ ] Test responsive behavior matches old site
- [ ] Verify markdown rendering matches
- [ ] Test image optimization and formats
- [ ] Compare page layouts side-by-side
- [ ] Fix any discrepancies

### Performance Optimization
- [ ] Optimize database queries
- [ ] Add database indexes where needed
- [ ] Implement caching strategy
- [ ] Optimize image loading
- [ ] Minimize bundle size
- [ ] Test page load times
- [ ] Optimize SSR performance

### Testing
- [ ] Test all public pages functionality
- [ ] Test all admin functionality
- [ ] Test authentication and authorization
- [ ] Test image upload and processing
- [ ] Test content editing workflow
- [ ] Test responsive design on multiple devices
- [ ] Cross-browser testing
- [ ] Test error handling and edge cases
- [ ] Performance testing
- [ ] Security testing

### Bug Fixes
- [ ] Fix any discovered bugs
- [ ] Address performance issues
- [ ] Fix UI/UX issues
- [ ] Resolve any migration issues

### Documentation
- [ ] Update README with new setup instructions
- [ ] Document environment variables
- [ ] Document database schema
- [ ] Document API endpoints
- [ ] Create admin user guide
- [ ] Document deployment process

### Deployment Preparation
- [ ] Set up production database
- [ ] Configure production environment variables
- [ ] Set up image storage (filesystem or cloud)
- [ ] Configure production build settings
- [ ] Set up CI/CD pipeline (optional)
- [ ] Create deployment scripts
- [ ] Test production build locally

### Deployment
- [ ] Deploy to staging environment
- [ ] Test on staging
- [ ] Fix staging issues
- [ ] Deploy to production
- [ ] Verify production deployment
- [ ] Monitor for errors
- [ ] Set up monitoring and logging

### DNS Cutover
- [ ] Plan DNS cutover timing
- [ ] Backup old site (if needed)
- [ ] Update DNS records
- [ ] Verify DNS propagation
- [ ] Monitor site after cutover
- [ ] Have rollback plan ready

### Post-Deployment
- [ ] Monitor site performance
- [ ] Monitor error logs
- [ ] Gather user feedback
- [ ] Address any post-launch issues
- [ ] Plan future improvements

---

## Optional Enhancements (Future)

### Content Versioning
- [ ] Add draft/published states to pages
- [ ] Implement content versioning system
- [ ] Add version history UI
- [ ] Add rollback functionality

### Additional Features
- [ ] Add page templates
- [ ] Add content block templates
- [ ] Add bulk operations
- [ ] Add export/import functionality
- [ ] Add advanced search
- [ ] Add analytics dashboard

---

## Notes

- Mark items as complete by changing `[ ]` to `[x]`
- Add sub-tasks or notes under each item as needed
- Prioritize Phase 1-2 to get public site working first
- Test thoroughly before moving to next phase
- Keep old implementation running until migration is complete

