# Les Pattes Heureuses

Site vitrine statique pour un cabinet vétérinaire fictif, avec présentation des soins, équipe,
tarifs, préparation de visite, galerie agrandissable et récapitulatif de demande de rendez-vous.

## Refonte

Direction : vert profond, ivoire et sauge, typographie éditoriale, photographies documentaires.
Menu mobile, navigation active, animations respectant la réduction des mouvements, détails
de soins dépliables et galerie accessible au clavier. Les trois nouvelles images WebP totalisent
environ 466 ko. Les anciennes images restent disponibles dans assets sans être chargées.

Le formulaire ne transmet rien et ne conserve aucune donnée. Il produit uniquement un
récapitulatif local et bloque les dates passées, dimanches et samedis après-midi.
Pour une mise en production : remplacer les données fictives, connecter un service réel de
réception ou réservation, puis compléter les informations légales et de confidentialité
selon les traitements réellement mis en place. Aucun faux avis n'est affiché.
Les polices sont chargées depuis Google Fonts, avec polices de repli si indisponibles.

## Ouvrir le site

Ouvrez `index.html` dans un navigateur.

## Fichiers principaux

- `index.html` : structure de la page et contenus.
- `styles.css` : direction artistique, responsive, composants.
- `script.js` : navigation, galerie, animations et formulaire de démonstration.
- `assets/` : logo SVG et photographies générées pour illustrer le cabinet fictif.
- `assets/IMAGE-PROMPTS.md` : provenance et prompts des nouvelles images.

## Donnees a personnaliser

- Adresse : `12 avenue des Tilleuls, 35000 Rennes`
- Téléphone : `02 99 00 00 00`
- Horaires et tarifs indicatifs
- Les coordonnées fictives ne déclenchent pas d'appel ou d'itinéraire.
