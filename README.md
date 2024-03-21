# RoadMap Inter-service
Ce projet comprend une application Angular ainsi qu'une API. Le but de ce projet est de pouvoir afficher des timelines avec différentes vues, ainsi que d'avoir un accès privé nous permettant d'administrer les éléments de la timeline.

## Base de données
Pensez à modifier la configuration dans le fichier .env pour accéder à votre base de données. Lancez votre serveur MySQL et ajoutez une nouvelle base de données nommée par exemple inter-service.

### Attention 
Quand vous créez un utilisateur directement dans MySQL, pensez à bien crypter le mot de passe avec Bcrypt. Vous pouvez trouver facilement un `Bcrypt Password Generator` sur Internet, par exemple sur `browserling.com`.

## Lancer l'API
Pour démarrer l'API, lancez la commande `npm start` ou `node server.js` à la racine du dossier backend. Le serveur se lancera sur `http://localhost:3000/`. Veuillez modifier le fichier .env pour l'adapter à votre environnement.

Dans le fichier server.js, vous pouvez activer le HTTPS et dans le app.js, vous pouvez également ouvrir l'API à d'autres origines. Actuellement, elle est configurée pour accepter uniquement l'adresse suivante : `http://localhost:4200/`.

## Lancer l'application Angular
Pour démarrer l'application, lancez la commande `npm start` ou `ng serve` à la racine du dossier frontend. Le serveur se lancera sur `http://localhost:4200/`. Veuillez modifier le fichier .env pour l'adapter à votre environnement.

## Pour Build le Projet
lancez la commande `npm build` ou `ng build` à la racine du dossier frontend. Un dossier dist/interservice sera créer.