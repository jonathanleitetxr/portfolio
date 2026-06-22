INSERT INTO project_slides (project_id, image_url, tag, description, slide_order) VALUES
(
  2,
  'assets/images/placeholder.png',
  'Architecture fullstack',
  'Conception d''une application complète découplée : frontend Angular 22 déployé sur Vercel, backend Spring Boot 3.5 déployé sur Railway avec base de données PostgreSQL, communiquant via une API REST sécurisée.',
  0
),
(
  2,
  'assets/images/placeholder.png',
  'Authentification JWT & sécurité',
  'Implémentation d''un système d''authentification stateless avec Spring Security et tokens JWT. Hachage des mots de passe avec BCrypt, protection des routes sensibles, et configuration CORS adaptée à chaque environnement.',
  1
),
(
  2,
  'assets/images/placeholder.png',
  'Édition inline & CRUD complet',
  'Plutôt qu''un back-office séparé, choix d''une édition directement intégrée à l''interface publique : chaque page affiche des contrôles d''administration visibles uniquement en étant connecté, permettant de créer, modifier et supprimer tout le contenu du site sans jamais toucher au code.',
  2
),
(
  2,
  'assets/images/placeholder.png',
  'Upload d''images avec recadrage',
  'Système complet de gestion d''images : upload depuis l''interface, recadrage interactif avant envoi (ngx-image-cropper), stockage persistant sur un volume Railway, et nettoyage automatique des anciens fichiers lors d''un remplacement.',
  3
),
(
  2,
  'assets/images/placeholder.png',
  'Drag & drop avec persistance',
  'Réordonnancement par glisser-déposer (Angular CDK) sur les compétences, formations, expériences et slides de projets, avec sauvegarde immédiate de l''ordre choisi en base de données.',
  4
),
(
  2,
  'assets/images/placeholder.png',
  'Animation FLIP',
  'Implémentation d''une transition fluide où une carte projet se transforme visuellement en modal plein écran (technique FLIP : First, Last, Invert, Play), pour une expérience utilisateur soignée.',
  5
),
(
  2,
  'assets/images/placeholder.png',
  'Assistant IA contextuel',
  'Développement d''un assistant conversationnel basé sur l''API Google Gemini, capable de répondre aux questions des visiteurs en s''appuyant exclusivement sur les données réelles du profil, avec un système de contraintes strictes pour éviter les réponses hors-sujet.',
  6
),
(
  2,
  'assets/images/placeholder.png',
  'Système d''email transactionnel',
  'Intégration de Resend pour l''envoi d''emails depuis le formulaire de contact, avec expéditeur personnalisé sur le nom de domaine du projet et gestion du Reply-To pour permettre une réponse directe à l''expéditeur.',
  7
),
(
  2,
  'assets/images/placeholder.png',
  'Tests unitaires & d''intégration',
  'Couverture de tests sur les couches critiques : tests unitaires avec Mockito pour les services Java, tests d''intégration avec MockMvc pour les controllers, et tests Angular avec HttpClientTestingModule pour les services frontend.',
  8
),
(
  2,
  'assets/images/placeholder.png',
  'Responsive design',
  'Interface entièrement adaptative, avec une navigation repensée en menu hamburger sur mobile, garantissant une expérience cohérente sur tous les types d''écrans.',
  9
);