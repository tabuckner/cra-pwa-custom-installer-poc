import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [showInstallPromo, setShowInstallPromo] = useState(false);
  
  // CUSTOM PWA INSTALL START
  // Initialize deferredPrompt for use later to show browser install prompt.
  const [deferredPrompt, setDeferredPrompt] = useState(undefined);
  // let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    console.warn(e);
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    // deferredPrompt = e;
    setDeferredPrompt(e);
    // Update UI notify the user they can install the PWA
    showInstallPromotion();
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
  });

  function showInstallPromotion() {
    setShowInstallPromo(true);
  }

  function hideInstallPromotion() {
    setShowInstallPromo(false);
  }

  async function handleInstall() {
    // Hide the app provided install promotion
    hideInstallPromotion();
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
  }

  window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion
    hideInstallPromotion();
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    alert('PWA was installed');
  });

  // CUSTOM PWA INSTALL END

  return (
    <div className="App">
      <header className="App-header">
        {showInstallPromo ? <div>This is our super awesome PWA Install Promo Banner! Install below!</div> : null}

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleInstall}>Install Me</button>
      </header>
    </div>
  );
}

export default App;
