# Resource Explorer

A Pokemon resource explorer application built with Next.js and TypeScript.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Browse Pokemon with pagination support
- View detailed Pokemon information
- Filter Pokemon by type
- Search functionality:
  - Search by Pokémon name
  - Filter by Pokémon type
  - Sort by name or ID (ascending/descending)
- Favorites system:
  - Toggle favorites (persisted in localStorage)
  - Filter to show favorites only
- Enhanced user experience:
  - Loading skeletons for smooth transitions
  - Error states with retry functionality
  - Empty state indicators
  - Request cancellation on filter changes
  - Optimistic UI updates for favorite toggling

# Application Architecture

### Core Architecture
- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: PokeAPI

## Directory Structure

The project is organized into the following directories:

```
src/
├── app/                 # Next.js
├── components/          # React Components
├── hooks/              # Custom React Hooks
├── lib/                # Utilities and API
└── types/              # TypeScript type definitions
```


### Application Layers

#### 1. Data Layer
- **api.ts**
  - Central API client
  - Type-safe Pokemon API interfaces
  - RESTful endpoints for Pokemon data

#### 2. State Management
- **useFavorites.ts**
  - Custom hook for favorites management
  - LocalStorage persistence
  - Optimistic UI updates

#### 3. UI Components

##### Layout Components
- **layout.tsx**: Root layout with navigation
- **page.tsx**: Main entry point

##### Feature Components
- **components/items/**
  - `ItemList.tsx`: Main Pokemon grid with filtering
  - `ItemCard.tsx`: Individual Pokemon card
  - `ItemDetail.tsx`: Detailed Pokemon view

##### UI Controls
- **components/filter/**
  - `SearchFilterSort.tsx`: Search, filter, and sort controls
- **components/pagination/**
  - `Pagination.tsx`: Page navigation

# Development Approach & Trade-offs

### Core Priorities
- **URL-Driven State Management**
  - Search parameters
  - Filter selections
  - Sort preferences
  - Pagination state

- **Performance & UX**
  - AbortController for request cancellation
  - Loading skeleton states
  - Empty state handling
  - Error retry mechanism

### Technical Trade-offs

#### 1. Navigation Experience
- Scroll position restoration
  - Currently resets to top on back/forward navigation
  - Could be improved with sessionStorage implementation

#### 2. Data Management
- Client-side caching
  - No persistent data cache
  - Potential for unnecessary refetching

## Future Improvements

1. **Navigation Enhancement**
   - Implement scroll position restoration
   - Add navigation progress indicators

2. **Data Management**
   - Implement React Query for caching
   - Add background data refresh
   - Optimize request patterns

3. **User Experience**
   - Add theme toggle (light/dark)
   - Improve favorite toggle animations
   - Enhanced loading states

### Performance Optimizations
- Implement virtualization for large lists
- Add image lazy loading
- Optimize bundle size

### Testing & Quality
- Add E2E tests with Playwright
- Implement unit tests for core functions
- Add accessibility testing


