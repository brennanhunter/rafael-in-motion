# Navigation Redesign with Stairs Transition - Roadmap

## 🎯 Project Overview
Replace the current header navigation with a sophisticated hamburger menu featuring a "stairs transition" animation where 5 bars cascade down from the top of the screen to reveal the navigation menu.

## 📋 Current State Analysis

### Current Navigation Structure
- **Location**: `src/app/components/Header.tsx`
- **Style**: Fixed header with horizontal navigation
- **Features**: Logo, dropdown menu for Artwork, standard links
- **Issues**: User finds it unsatisfactory, wants complete overhaul

### Current Animation Capabilities
- GSAP already integrated (seen in AnimatedExhibitions.tsx)
- Tailwind CSS with transition utilities
- Mix-blend-mode effects for visual depth
- Complex 3D animations in InteractiveGallery.tsx

### Dependencies Already Available
- ✅ GSAP (Green Sock Animation Platform)
- ✅ Framer Motion
- ✅ Tailwind CSS
- ✅ Next.js Image optimization
- ✅ TypeScript

## 🗺️ Implementation Roadmap

### Phase 1: Planning & Design (1-2 hours)
- [ ] **1.1** Define exact animation specifications
  - Number of bars (5 as mentioned)
  - Cascade timing and easing
  - Bar dimensions and positioning
  - Color scheme and opacity
  
- [ ] **1.2** Design menu layout
  - Mobile vs Desktop variations
  - Menu item positioning
  - Typography and spacing
  - Background treatment

- [ ] **1.3** Create animation mockup
  - Storyboard the stairs effect
  - Define keyframes and duration
  - Plan interaction states (hover, active)

### Phase 2: Core Component Development (2-3 hours)
- [ ] **2.1** Create new Navigation component
  - `src/app/components/Navigation.tsx`
  - Replace Header.tsx functionality
  - Implement hamburger button
  
- [ ] **2.2** Build Stairs Animation System
  - `src/app/components/StairsTransition.tsx`
  - 5 animated bars with cascade effect
  - GSAP timeline for smooth coordination
  - Enter and exit animations

- [ ] **2.3** Create Menu Overlay
  - `src/app/components/MenuOverlay.tsx`
  - Full-screen or partial overlay
  - Navigation links with animations
  - Mobile-responsive design

### Phase 3: Animation Implementation (2-3 hours)
- [ ] **3.1** Hamburger Button Animation
  - Morphing hamburger → X transition
  - Smooth line transformations
  - Loading states
  
- [ ] **3.2** Stairs Cascade Effect
  - 5 bars enter from top
  - Staggered timing (0.1s intervals)
  - Easing: `power2.out` or similar
  - Bar colors and opacity effects

- [ ] **3.3** Menu Content Animation
  - Links fade in after bars
  - Subtle hover effects
  - Typography animations
  - Logo treatment

### Phase 4: Integration & Styling (1-2 hours)
- [ ] **4.1** Update Layout Structure
  - Modify `src/app/layout.tsx`
  - Replace Header with Navigation
  - Ensure proper z-index management
  
- [ ] **4.2** CSS Enhancements
  - Add stairs animation CSS
  - Mobile responsiveness
  - Mix-blend-mode integration
  - Performance optimizations

- [ ] **4.3** Theme Integration
  - Match existing color scheme
  - Font integration (Cinzel, Geist)
  - Consistent spacing and sizing

### Phase 5: Advanced Features (1-2 hours)
- [ ] **5.1** Enhanced Interactions
  - Close on outside click
  - Escape key support
  - Touch gesture support
  - Accessibility improvements

- [ ] **5.2** Performance Optimization
  - Animation GPU acceleration
  - Reduced motion preferences
  - Preload optimizations
  - Memory management

- [ ] **5.3** State Management
  - Menu open/close state
  - Active page highlighting
  - Scroll position handling
  - Route change integration

### Phase 6: Testing & Polish (1 hour)
- [ ] **6.1** Cross-Device Testing
  - Mobile responsiveness
  - Touch interactions
  - Performance on slower devices
  
- [ ] **6.2** Browser Compatibility
  - Modern browser testing
  - Fallback for unsupported features
  - Animation performance validation

- [ ] **6.3** Accessibility Audit
  - Screen reader compatibility
  - Keyboard navigation
  - Focus management
  - ARIA labels

## 🎨 Technical Specifications

### Animation Details
```typescript
// Stairs Animation Timeline - CONFIRMED SPECS
// - Black bars (matching hero aesthetic)
// - White text (like "RAFAEL" in hero)
// - 0.3 seconds per bar in/out
// - 5 bars total = 1.5 seconds cascade

const stairsTimeline = gsap.timeline();

// Bar 1 (top)
stairsTimeline.fromTo('.stair-bar-1', 
  { y: '-100%' },
  { y: '0%', duration: 0.3, ease: 'power2.out' }
);

// Bars 2-5 (staggered cascade every 0.3s)
stairsTimeline.fromTo('.stair-bar-2', 
  { y: '-100%' }, 
  { y: '0%', duration: 0.3, ease: 'power2.out' }, 0.3);
stairsTimeline.fromTo('.stair-bar-3', 
  { y: '-100%' }, 
  { y: '0%', duration: 0.3, ease: 'power2.out' }, 0.6);
stairsTimeline.fromTo('.stair-bar-4', 
  { y: '-100%' }, 
  { y: '0%', duration: 0.3, ease: 'power2.out' }, 0.9);
stairsTimeline.fromTo('.stair-bar-5', 
  { y: '-100%' }, 
  { y: '0%', duration: 0.3, ease: 'power2.out' }, 1.2);

// Total cascade time: 1.5 seconds (last bar completes at 1.5s)
```

### Component Structure
```
src/app/components/
├── Navigation.tsx           # Main navigation wrapper
├── HamburgerButton.tsx     # Animated hamburger/X button
├── StairsTransition.tsx    # 5-bar cascade animation
├── MenuOverlay.tsx         # Full menu content
└── NavigationLink.tsx      # Individual nav items
```

### CSS Classes Structure
```css
.navigation-container       /* Main wrapper */
.hamburger-button          /* Button container */
.hamburger-line           /* 3 lines for hamburger */
.stairs-overlay           /* Full screen overlay */
.stair-bar               /* Individual black bars (5 total) */
.menu-overlay            /* Menu content container */
.menu-content            /* Inner content wrapper */
.nav-link                /* Individual navigation items */

/* Design Specifications */
.stair-bar {
  background: #000;        /* Black bars */
  color: #fff;            /* White text (like RAFAEL hero) */
  height: 20vh;           /* Each bar 20% of viewport height */
  font-family: var(--font-cinzel); /* Match hero typography */
}
```

## 🔧 File Modifications Required

### New Files to Create
1. `src/app/components/Navigation.tsx`
2. `src/app/components/HamburgerButton.tsx`
3. `src/app/components/StairsTransition.tsx`
4. `src/app/components/MenuOverlay.tsx`
5. `src/app/components/NavigationLink.tsx`

### Files to Modify
1. `src/app/layout.tsx` - Replace Header with Navigation
2. `src/app/globals.css` - Add navigation and animation styles
3. `src/app/components/PageWrapper.tsx` - Handle menu state integration

### Files to Remove
1. `src/app/components/Header.tsx` - Replace entirely

## 🎯 Success Criteria

### Visual Goals
- [ ] Smooth 5-bar cascade animation from top
- [ ] Professional hamburger → X transformation
- [ ] Consistent with existing brand aesthetics
- [ ] Mobile-first responsive design

### Performance Goals
- [ ] Animations run at 60fps
- [ ] No layout shift during transitions
- [ ] Fast load times (<100ms to start animation)
- [ ] Smooth on mobile devices

### UX Goals
- [ ] Intuitive hamburger button placement
- [ ] Clear visual feedback for interactions
- [ ] Easy menu dismissal
- [ ] Accessible navigation experience

## 📱 Responsive Considerations

### Mobile (320px - 768px)
- Smaller hamburger button
- Full-screen menu overlay
- Touch-optimized tap targets
- Simplified animations

### Tablet (768px - 1024px)
- Medium-sized elements
- Partial overlay option
- Hover states available
- Enhanced animations

### Desktop (1024px+)
- Full animation complexity
- Hover effects and transitions
- Larger target areas
- Advanced visual effects

## 🚀 Quick Start Guide

1. **Begin with Phase 1** - Define exact animation behavior
2. **Create base Navigation component** - Replace Header.tsx
3. **Implement basic hamburger button** - No animation initially
4. **Add stairs transition** - 5 bars cascade effect
5. **Style and integrate** - Match existing design
6. **Test and polish** - Cross-device validation

## 📝 Notes
- Maintain existing navigation links and functionality
- Preserve mix-blend-difference effects for logo visibility
- Ensure compatibility with existing PageWrapper transitions
- Consider reduced motion accessibility preferences
- Keep animation libraries consistent (GSAP preferred)

---

**Estimated Total Time**: 8-12 hours
**Complexity Level**: Medium-High
**Dependencies**: All required libraries already installed
**Risk Level**: Low (existing functionality preserved)
