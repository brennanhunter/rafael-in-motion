'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useNavigation } from '../PageWrapper';

interface StairsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Stairs: React.FC<StairsProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { triggerStairsNavigation } = useNavigation();
  const [visibleColumns, setVisibleColumns] = useState<number[]>([]);
  const [exitingColumns, setExitingColumns] = useState<number[]>([]);
  const [shouldRender, setShouldRender] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [visibleMenuItems, setVisibleMenuItems] = useState<number[]>([]);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const menuItems = [
    { text: 'HOME', href: '/' },
    { text: 'ART DECO', href: '/art-deco' },
    { text: 'ABSTRACT', href: '/abstract' },
    { text: 'INTERIORS', href: '/interiors' },
    { text: 'CONTACT', href: '/contact' }
  ];

  const handleMenuClick = (href: string) => {
    // Check if we're already on this page
    if (pathname === href) {
      console.log('Already on this page, just closing menu');
      onClose(); // Just close the menu, no navigation needed
      return;
    }
    
    setPendingNavigation(href);
    // Trigger PageWrapper loading immediately
    triggerStairsNavigation();
    // Then navigate
    router.push(href);
  };

  console.log('Stairs component rendered, isOpen:', isOpen);
  
  useEffect(() => {
    if (isOpen) {
      console.log('Stairs opening, starting ENTER animation');
      setShouldRender(true);
      setExitingColumns([]);
      setVisibleColumns([]); // Reset
      
      // ENTER ANIMATION: Columns fall from top with initial delay
      const timeouts: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < 5; i++) {
        const timeout = setTimeout(() => {
          setVisibleColumns(prev => [...prev, i]);
          console.log(`Column ${i + 1} entering`);
        }, 50 + (i * 100)); // Reduced from 100 + (i * 150) to 50 + (i * 100)
        
        timeouts.push(timeout);
      }
      
      // Show menu after all columns are in place
      const menuTimeout = setTimeout(() => {
        setShowMenu(true);
        console.log('All columns in place, showing menu');
        
        // Stagger menu item animations
        menuItems.forEach((_, index) => {
          setTimeout(() => {
            setVisibleMenuItems(prev => [...prev, index]);
          }, index * 100); // Reduced from 150ms to 100ms delay between each item
        });
      }, 50 + (5 * 100) + 400); // Reduced transition time from 600ms to 400ms
      
      timeouts.push(menuTimeout);
      
      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    } else if (!isOpen && shouldRender) {
      console.log('Stairs closing via onClose button');
      setShowMenu(false); // Hide menu immediately when closing starts
      setVisibleMenuItems([]); // Reset menu items
      
      // Simple immediate close - no exit animation
      setShouldRender(false);
      setVisibleColumns([]);
      setExitingColumns([]);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) {
    console.log('Should not render, returning null');
    return null;
  }

  console.log('Stairs is open, rendering overlay with', visibleColumns.length, 'visible columns');

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        display: 'flex'
      }}
    >
      {/* Column 1 */}
      <div style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#000000', // Black
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: exitingColumns.includes(0) 
          ? 'translateY(100%)' 
          : visibleColumns.includes(0) 
            ? 'translateY(0)' 
            : 'translateY(-100%)',
        transition: 'transform 0.4s ease-out'
      }}>
      </div>
      
      {/* Column 2 */}
      <div style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#000000', // Black
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: exitingColumns.includes(1) 
          ? 'translateY(100%)' 
          : visibleColumns.includes(1) 
            ? 'translateY(0)' 
            : 'translateY(-100%)',
        transition: 'transform 0.4s ease-out'
      }}>
      </div>
      
      {/* Column 3 */}
      <div style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#000000', // Black
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: exitingColumns.includes(2) 
          ? 'translateY(100%)' 
          : visibleColumns.includes(2) 
            ? 'translateY(0)' 
            : 'translateY(-100%)',
        transition: 'transform 0.4s ease-out'
      }}>
      </div>
      
      {/* Column 4 */}
      <div style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#000000', // Black
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: exitingColumns.includes(3) 
          ? 'translateY(100%)' 
          : visibleColumns.includes(3) 
            ? 'translateY(0)' 
            : 'translateY(-100%)',
        transition: 'transform 0.4s ease-out'
      }}>
      </div>
      
      {/* Column 5 */}
      <div style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#000000', // Black
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: exitingColumns.includes(4) 
          ? 'translateY(100%)' 
          : visibleColumns.includes(4) 
            ? 'translateY(0)' 
            : 'translateY(-100%)',
        transition: 'transform 0.4s ease-out'
      }}>
      </div>
      
      {/* Navigation Menu - appears after all columns are in place */}
      {showMenu && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          zIndex: 1
        }}>
          <div className="text-center" style={{
            opacity: showMenu ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out'
          }}>
            {menuItems.map((item, index) => (
              <div 
                key={item.text}
                className="text-6xl md:text-7xl lg:text-8xl font-cinzel font-bold text-white tracking-wider mb-8 cursor-pointer hover:opacity-80 transition-all duration-500" 
                style={{
                  opacity: visibleMenuItems.includes(index) ? 1 : 0,
                  transform: visibleMenuItems.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
                }}
                onClick={() => handleMenuClick(item.href)}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stairs;
