INSERT INTO project_slides (project_id, image_url, tag, description, slide_order) VALUES
(
  3,
  'assets/images/onlycraft-placeholder.png',
  'Architecture RabbitMQ',
  'Conception de la communication asynchrone entre les 5 microservices (Authentification, Chat, Notification, Media, Génération de factures) via RabbitMQ. Mise en place des configurations d''échanges et de files d''attente pour permettre un découplage total des services : chaque service publie ses événements sans connaître les consommateurs, garantissant une scalabilité et une résilience accrues du système.',
  0
),
(
  3,
  'assets/images/onlycraft-placeholder.png',
  'Service Authentification',
  'Développement du microservice d''authentification en collaboration avec un camarade : gestion des inscriptions et connexions avec chiffrement des mots de passe, génération de tokens JWT, et intégration d''OAuth2 pour la connexion via fournisseurs externes. Le service publie un événement RabbitMQ à chaque inscription pour déclencher automatiquement l''envoi d''une notification.',
  1
),
(
  3,
  'assets/images/onlycraft-placeholder.png',
  'Service Notification',
  'Service de notification entièrement piloté par les événements RabbitMQ : il s''abonne aux événements émis par les autres microservices (inscription, connexion, nouveau message) pour générer et transmettre les notifications appropriées aux utilisateurs en temps réel, sans aucune dépendance directe avec les services émetteurs.',
  2
),
(
  3,
  'assets/images/onlycraft-placeholder.png',
  'Chat WebSocket',
  'Implémentation d''un système de chat en temps réel via WebSocket (protocole STOMP), complémentaire à RabbitMQ pour les échanges nécessitant une latence minimale. Gestion de la persistance des messages, des conversations entre utilisateurs, et de la double notification (RabbitMQ pour l''alerte différée, WebSocket pour l''affichage instantané).',
  3
);