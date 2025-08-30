<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR Code - PATERSON-MD</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="shortcut icon" href="https://files.catbox.moe/39z8jd.jpg" type="image/x-icon">
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>
  <style>
    :root {
      --primary: #6b00ff;
      --secondary: #4b0082;
      --accent: #9370db;
      --dark: #0c0032;
      --darker: #080022;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    body {
      background: linear-gradient(135deg, var(--dark), #190061, var(--dark));
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      color: white;
      overflow-x: hidden;
      position: relative;
      line-height: 1.6;
    }
    
    body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 20%),
        radial-gradient(circle at 90% 80%, rgba(255,255,255,0.05) 0%, transparent 20%);
      pointer-events: none;
      z-index: -1;
    }
    
    .header {
      text-align: center;
      padding: 30px 20px;
      position: relative;
      z-index: 10;
      background: rgba(8, 14, 44, 0.6);
      border-bottom: 2px solid var(--primary);
    }
    
    .logo {
      font-size: 2.5rem;
      margin-bottom: 10px;
      color: var(--primary);
      text-shadow: 0 0 15px rgba(107, 0, 255, 0.7);
    }
    
    h1 {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 5px;
      background: linear-gradient(45deg, #fff, var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    
    .container {
      max-width: 500px;
      margin: 20px auto;
      padding: 0 20px;
      position: relative;
      z-index: 10;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .card {
      background: rgba(8, 14, 44, 0.8);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
      border: 1px solid var(--primary);
      width: 100%;
      max-width: 400px;
    }
    
    .card-header {
      background: linear-gradient(90deg, var(--secondary), var(--primary));
      padding: 20px;
      text-align: center;
      border-bottom: 2px solid var(--accent);
    }
    
    .card-icon {
      font-size: 2rem;
      margin-bottom: 10px;
      color: white;
    }
    
    .card-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: white;
    }
    
    .card-content {
      padding: 25px;
      text-align: center;
    }
    
    #qrcode {
      width: 250px;
      height: 250px;
      background: white;
      padding: 15px;
      border-radius: 12px;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
    }
    
    #qrcode img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 8px;
    }
    
    .countdown {
      font-size: 1.4rem;
      font-weight: bold;
      color: var(--accent);
      margin: 15px 0;
      padding: 10px 15px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      border: 1px solid var(--accent);
    }
    
    .btn {
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      color: white;
      border: none;
      padding: 14px;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
      max-width: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      margin-top: 15px;
    }
    
    .btn:hover {
      background: linear-gradient(90deg, var(--secondary), var(--primary));
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(107, 0, 255, 0.4);
    }
    
    .btn:active {
      transform: translateY(1px);
    }
    
    .status-container {
      margin-top: 20px;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      background: rgba(0, 0, 0, 0.3);
      border: 1px dashed var(--accent);
      width: 100%;
      max-width: 400px;
    }
    
    #status {
      font-weight: bold;
      color: var(--accent);
      margin-top: 10px;
      font-size: 1.2rem;
    }
    
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 250px;
      gap: 20px;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(107, 0, 255, 0.2);
      border-top: 5px solid var(--primary);
      border-radius: 50%;
      animation: spin 1.5s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .instructions {
      margin-top: 30px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 12px;
      padding: 20px;
      border: 1px solid var(--accent);
      width: 100%;
      max-width: 500px;
    }
    
    .step {
      display: flex;
      margin-bottom: 20px;
      align-items: flex-start;
    }
    
    .step-number {
      background: var(--primary);
      color: white;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 15px;
      flex-shrink: 0;
    }
    
    .step-content {
      flex: 1;
      text-align: left;
    }
    
    .step-title {
      font-weight: bold;
      margin-bottom: 5px;
      color: var(--accent);
      font-size: 1.1rem;
    }
    
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.3);
      position: relative;
      z-index: 10;
    }
    
    @media (max-width: 768px) {
      .header {
        padding: 25px 15px;
      }
      
      h1 {
        font-size: 1.6rem;
      }
      
      .logo {
        font-size: 2rem;
      }
      
      .card-header {
        padding: 15px;
      }
      
      .card-content {
        padding: 20px;
      }
      
      #qrcode {
        width: 220px;
        height: 220px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <i class="fas fa-qrcode"></i>
    </div>
    <h1>CONNEXION PAR QR CODE</h1>
    <p>Connectez votre compte WhatsApp à PATERSON-MD</p>
  </div>
  
  <div class="container">
    <div class="card">
      <div class="card-header">
        <div class="card-icon">
          <i class="fas fa-mobile-alt"></i>
        </div>
        <h2 class="card-title">Scannez le QR Code</h2>
      </div>
      <div class="card-content">
        <div class="loading" id="loading">
          <div class="spinner"></div>
          <p>Génération du QR Code en cours...</p>
        </div>
        <div id="qrcode"></div>
        
        <div class="countdown" id="countdown">Le QR Code expire dans: 02:00</div>
        
        <button class="btn" id="generateBtn">
          <i class="fas fa-sync-alt"></i> Actualiser le QR Code
        </button>
        
        <div class="status-container">
          <p>Statut de connexion:</p>
          <p id="status">En attente de scan...</p>
        </div>
      </div>
    </div>
    
    <div class="instructions">
      <h3 style="text-align: center; margin-bottom: 20px; color: var(--accent);">Comment connecter votre compte WhatsApp</h3>
      
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <div class="step-title">Ouvrez WhatsApp</div>
          <p>Sur votre téléphone, ouvrez l'application WhatsApp</p>
        </div>
      </div>
      
      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <div class="step-title">Accédez aux appareils connectés</div>
          <p>Appuyez sur les trois points en haut à droite → Appareils connectés</p>
        </div>
      </div>
      
      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <div class="step-title">Scanner le QR Code</div>
          <p>Sélectionnez "Lier un appareil" et scannez le code ci-dessus</p>
        </div>
      </div>
      
      <div class="step">
        <div class="step-number">4</div>
        <div class="step-content">
          <div class="step-title">Utilisez le bot</div>
          <p>Commencez à utiliser PATERSON-MD une fois connecté</p>
        </div>
      </div>
      
      <div style="margin-top: 25px; padding: 15px; background: rgba(210, 16, 52, 0.2); border-radius: 8px; border-left: 3px solid var(--accent);">
        <i class="fas fa-exclamation-circle"></i> Le QR Code expire après 2 minutes. Gardez cette page ouverte pendant le scan.
      </div>
    </div>
  </div>
  
  <div class="footer">
    <p>PATERSON-MD &copy; <span id="currentYear"></span> | Développé par KERVENS AUBOURG</p>
    <p>Solution WhatsApp Bot</p>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const qrcodeDiv = document.getElementById("qrcode");
      const generateBtn = document.getElementById("generateBtn");
      const statusElement = document.getElementById("status");
      const countdownElement = document.getElementById("countdown");
      const loadingElement = document.getElementById("loading");
      
      // Set current year in footer
      document.getElementById('currentYear').textContent = new Date().getFullYear();
      
      let countdownInterval;
      let timeLeft = 120; // 2 minutes en secondes

      // Fonction pour récupérer le QR code depuis le serveur
      async function fetchQRCode() {
        try {
          loadingElement.style.display = 'flex';
          statusElement.textContent = 'Connexion au serveur...';
          
          const response = await fetch('/qr');
          if (!response.ok) {
            throw new Error('Erreur de récupération du QR code');
          }
          
          const qrData = await response.text();
          if (!qrData) {
            throw new Error('Données QR code vides');
          }
          
          // Générer le QR code à partir des données reçues
          generateQRCode(qrData);
        } catch (error) {
          console.error('Erreur:', error);
          statusElement.textContent = 'Erreur de connexion au serveur';
          loadingElement.style.display = 'none';
          
          // Réessayer après 5 secondes
          setTimeout(fetchQRCode, 5000);
        }
      }

      // Fonction pour générer le QR code
      function generateQRCode(qrData) {
        try {
          // Nettoyer le contenu précédent
          qrcodeDiv.innerHTML = '';
          
          // Générer le QR code avec la bibliothèque
          QRCode.toDataURL(qrData, {
            errorCorrectionLevel: 'H',
            width: 500,
            margin: 1,
            color: {
              dark: '#0c0032',
              light: '#ffffff'
            }
          }, function(err, url) {
            if (err) {
              console.error(err);
              statusElement.textContent = 'Erreur de génération du QR code';
              loadingElement.style.display = 'none';
              return;
            }
            
            // Afficher le QR code
            const img = document.createElement('img');
            img.src = url;
            img.alt = "QR Code de connexion WhatsApp";
            qrcodeDiv.appendChild(img);
            
            // Cacher le loader
            loadingElement.style.display = 'none';
            
            // Mettre à jour le statut
            statusElement.textContent = 'En attente de scan...';
            statusElement.style.color = 'var(--accent)';
            
            // Démarrer le compte à rebours
            startCountdown();
          });
        } catch (error) {
          console.error('Erreur génération QR:', error);
          statusElement.textContent = 'Erreur de génération';
          loadingElement.style.display = 'none';
        }
      }
      
      // Compte à rebours
      function startCountdown() {
        clearInterval(countdownInterval);
        timeLeft = 120;
        
        countdownInterval = setInterval(() => {
          if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = 'QR code expiré!';
            statusElement.textContent = 'QR code expiré - Actualisation en cours...';
            statusElement.style.color = '#ff6b6b';
            
            // Régénérer le QR code
            fetchQRCode();
          } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownElement.textContent = `Le QR Code expire dans: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            timeLeft--;
          }
        }, 1000);
      }
      
      // Gestionnaire d'événement pour le bouton de génération
      generateBtn.addEventListener('click', fetchQRCode);
      
      // Démarrer la récupération du QR code au chargement
      fetchQRCode();
    });
  </script>
</body>
</html>
