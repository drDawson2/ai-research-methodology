/* MOBILE NAVIGATION */
.mobile-menu-toggle {
    display: none;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1001;
    background: var(--forest-green);
    color: white;
    border: none;
    padding: 12px 15px;
    cursor: pointer;
    font-size: 1.5em;
    line-height: 1;
}

.mobile-menu-toggle:hover {
    background: var(--rich-brown);
}

.sidebar.mobile-open {
    transform: translateX(0);
}

.mobile-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.mobile-overlay.active {
    display: block;
}

/* TAB INTERFACE */
.tab-container {
    margin: 30px 0;
}

.tab-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-bottom: 3px solid var(--forest-green);
    margin-bottom: 30px;
}

.tab-button {
    background: var(--cream-light);
    border: none;
    border-bottom: 3px solid transparent;
    padding: 15px 25px;
    cursor: pointer;
    font-family: 'Caudex', Georgia, serif;
    font-size: 0.95em;
    color: var(--text);
    transition: all 0.3s;
    margin-bottom: -3px;
}

.tab-button:hover {
    background: var(--cream);
    color: var(--forest-green);
}

.tab-button.active {
    background: white;
    border-bottom-color: var(--forest-green);
    font-weight: bold;
    color: var(--forest-green);
}

.tab-content-container {
    background: white;
    padding: 30px;
    border: 1px solid var(--soft-amber);
}

.tab-pane {
    display: none;
}

.tab-pane.active {
    display: block;
}

/* Mobile tab dropdown */
.tab-dropdown {
    display: none;
    width: 100%;
    padding: 12px;
    font-family: 'Caudex', Georgia, serif;
    font-size: 1em;
    border: 2px solid var(--forest-green);
    background: white;
    margin-bottom: 20px;
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
    .sidebar {
        width: 240px;
    }
    
    .main-content {
        margin-left: 240px;
        padding: 30px 40px;
    }
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: block;
    }
    
    .sidebar {
        position: fixed;
        width: 280px;
        height: 100vh;
        left: 0;
        top: 0;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .main-content {
        margin-left: 0;
        padding: 70px 20px 20px 20px;
    }
    
    /* Tab interface mobile */
    .tab-nav {
        display: none;
    }
    
    .tab-dropdown {
        display: block;
    }
