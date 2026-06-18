// ============================================================
//  FICHIER DE DONNEES PRODUITS — PHARMACIE RHAZLAOUI
//  Produits réels identifiés depuis les photos de la pharmacie
// ============================================================

const PRODUCTS = {

  // ─────────────────────────────────────────
  // COSMÉTIQUES & SOINS DE LA PEAU
  // ─────────────────────────────────────────
  cosmetiques: [
    {
      id: "cos-001",
      nom: "Oxyskin Anti-Tâches",
      marque: "Oxyskin Beauty Formula",
      gamme: "Soins Visage",
      prix: "",
      ancienPrix: "",
      badge: "NOUVEAU",
      image: "images/gallery/photo-169.jpg",
      imagePerso: "",
      description: "Purifie la peau, illumine le teint et unifie le grain de peau",
      bienfaits: ["Réduit visiblement les tâches brunes et l'hyperpigmentation", "Unifie le teint pour un éclat naturel", "Purifie la peau en profondeur", "Protège contre les agressions extérieures"],
      utilisation: "Appliquer matin et soir sur une peau propre et sèche. Masser délicatement le visage et le cou en mouvements circulaires. Éviter le contour des yeux.",
      composition: "Niacinamide, Vitamine C, Acide Kojique, Arbutine, Extrait de réglisse"
    },
    {
      id: "cos-002",
      nom: "Oxyskin Anti-Chute",
      marque: "Oxyskin Beauty Formula",
      gamme: "Soins Cheveux",
      prix: "",
      ancienPrix: "",
      badge: "",
      image: "images/gallery/photo-169.jpg",
      imagePerso: "",
      description: "Fortifie les cheveux et les ongles, réduit la chute capillaire",
      bienfaits: ["Renforce la fibre capillaire de la racine aux pointes", "Réduit significativement la chute de cheveux", "Stimule la repousse et la densité", "Nourrit et fortifie les ongles cassants"],
      utilisation: "Prendre 1 à 2 gélules par jour pendant les repas avec un grand verre d'eau. Cure recommandée de 3 mois.",
      composition: "Biotine, Zinc, Cystine, Sélénium, Vitamines B5 et B6, Fer"
    },
    {
      id: "cos-003",
      nom: "Perfectil",
      marque: "Vitabiotics",
      gamme: "Soins Peau",
      prix: "",
      ancienPrix: "",
      badge: "",
      image: "images/gallery/photo-161.jpg",
      imagePerso: "",
      description: "Formule triple action pour la peau, les cheveux et les ongles",
      bienfaits: ["Nourrit la peau de l'intérieur pour un teint lumineux", "Renforce les cheveux fragiles et réduit la casse", "Fortifie les ongles et prévient le dédoublement", "Apporte les nutriments essentiels à la beauté"],
      utilisation: "1 comprimé par jour, à prendre après le repas principal avec de l'eau froide. Ne pas croquer. Cure de 3 mois recommandée.",
      composition: "Biotine, Sélénium, Zinc, Vitamine C, Vitamine E, Fer, Acide folique, Collagène marin"
    },
    {
      id: "cos-004",
      nom: "Pigment Age Collagen Filler",
      marque: "Phor Max",
      gamme: "Anti-Âge",
      prix: "",
      ancienPrix: "",
      badge: "",
      image: "images/gallery/photo-277.jpg",
      imagePerso: "",
      description: "Soin anti-âge avancé au collagène pour combler les rides et redonner fermeté à la peau",
      bienfaits: ["Comble les rides et ridules visiblement", "Restaure la fermeté et l'élasticité de la peau", "Stimule la production naturelle de collagène", "Hydrate en profondeur et repulpe la peau"],
      utilisation: "Appliquer le matin sur le visage et le cou après le nettoyage. Masser jusqu'à absorption complète. Utiliser quotidiennement pour des résultats optimaux.",
      composition: "Collagène marin hydrolysé, Vitamine C, Zinc, Acide hyaluronique, Coenzyme Q10"
    },
    {
      id: "cos-005",
      nom: "Pigment Clair Anti-Tâches",
      marque: "Phor Max",
      gamme: "Éclaircissant",
      prix: "",
      ancienPrix: "",
      badge: "",
      image: "images/gallery/photo-277.jpg",
      imagePerso: "",
      description: "Soin éclaircissant qui unifie le teint et réduit les tâches pigmentaires",
      bienfaits: ["Atténue les tâches brunes et l'hyperpigmentation", "Unifie le teint pour une peau lumineuse", "Protège contre les UV et le masque de grossesse", "Prévient l'apparition de nouvelles tâches"],
      utilisation: "Appliquer matin et/ou soir sur les zones concernées. Bien protéger la peau du soleil pendant le traitement. Résultats visibles après 4 à 6 semaines.",
      composition: "Acide Kojique, Vitamine C, Alpha-Arbutine, Niacinamide, Filtres UV"
    },
    {
      id: "cos-006",
      nom: "Ura-Skin Anti-Tâches",
      marque: "Urania",
      gamme: "Soins Visage",
      prix: "",
      ancienPrix: "",
      badge: "NOUVEAU",
      image: "images/gallery/photo-275.jpg",
      imagePerso: "",
      description: "Formule avancée anti-tâches au glutathion et collagène marin pour une peau éclatante",
      bienfaits: ["Éclaircit les tâches brunes et unifie le teint", "Le glutathion combat le stress oxydatif cutané", "Le collagène marin raffermit et lisse la peau", "L'acide hyaluronique hydrate en profondeur"],
      utilisation: "Prendre 1 gélule le matin avec le petit-déjeuner. Cure de 2 à 3 mois pour des résultats optimaux. Associer à une protection solaire.",
      composition: "Glutathion 500mg, Collagène marin, Acide hyaluronique, Vitamine E, Vitamine C"
    },
    {
      id: "cos-007",
      nom: "Glutalia 250mg",
      marque: "Glutalia",
      gamme: "Éclaircissant",
      prix: "",
      ancienPrix: "",
      badge: "",
      image: "images/gallery/photo-275.jpg",
      imagePerso: "",
      description: "Complément au glutathion pour un teint clair et lumineux de l'intérieur",
      bienfaits: ["Antioxydant puissant qui protège les cellules", "Favorise un teint plus clair et uniforme", "Détoxifie le foie et purifie l'organisme", "Renforce le système immunitaire"],
      utilisation: "1 à 2 gélules par jour, de préférence à jeun ou 30 minutes avant le repas. Boire beaucoup d'eau. Cure de 3 à 6 mois.",
      composition: "L-Glutathion réduit 250mg, Vitamine C, N-Acétyl Cystéine"
    },
    {
      id: "cos-008",
      nom: "Glu White Glutathione",
      marque: "SDM Boost",
      gamme: "Éclaircissant",
      prix: "",
      ancienPrix: "",
      badge: "",
      image: "images/gallery/photo-275.jpg",
      imagePerso: "",
      description: "Glutathion concentré pour un effet anti-tâches et éclaircissant global",
      bienfaits: ["Réduit la mélanine pour un teint plus clair", "Puissant antioxydant cellulaire", "Combat les signes du vieillissement cutané", "Améliore la qualité et la texture de la peau"],
      utilisation: "1 gélule par jour, le matin à jeun avec un verre d'eau. Pour de meilleurs résultats, associer à la Vitamine C. Cure de 3 mois minimum.",
      composition: "L-Glutathion 500mg, Vitamine C 200mg, Acide Alpha-Lipoïque"
    },
    {
      id: "cos-009",
      nom: "Derm'Idéal+ Anti-Âge",
      marque: "Viticap",
      gamme: "Anti-Âge",
      prix: "",
      ancienPrix: "",
      badge: "",
      image: "images/gallery/photo-161.jpg",
      imagePerso: "",
      description: "Complément anti-âge pour préserver la jeunesse et l'éclat de la peau",
      bienfaits: ["Réduit l'apparition des rides et ridules", "Améliore l'élasticité et la fermeté de la peau", "Protège les cellules contre le stress oxydatif", "Stimule le renouvellement cellulaire"],
      utilisation: "2 gélules par jour pendant le repas. Cure de 2 à 3 mois, renouvelable. Associer à une bonne hydratation.",
      composition: "Resvératrol, Vitamine E, Vitamine C, Sélénium, Zinc, Bêta-carotène"
    },
    {
      id: "cos-010",
      nom: "SDM Boost",
      marque: "SDM",
      gamme: "Soins Peau",
      prix: "",
      ancienPrix: "",
      badge: "",
      image: "images/gallery/photo-275.jpg",
      imagePerso: "",
      description: "Traitement intensif pour restaurer la vitalité et la luminosité de la peau",
      bienfaits: ["Revitalise les peaux ternes et fatiguées", "Apporte éclat et luminosité naturelle", "Nourrit et répare la barrière cutanée", "Protège contre les radicaux libres"],
      utilisation: "1 gélule le matin et 1 le soir, pendant les repas. Cure de 1 à 3 mois selon les besoins.",
      composition: "Complexe de vitamines B, Vitamine C, Zinc, Biotine, Acides aminés"
    },
  ],

  // ─────────────────────────────────────────
  // COMPLÉMENTS ALIMENTAIRES
  // ─────────────────────────────────────────
  complements: [
    {
      id: "comp-001",
      nom: "Vitamine B12",
      marque: "Vertu Plus",
      gamme: "Vitamines",
      prix: "",
      ancienPrix: "",
      badge: "",
      image: "images/gallery/photo-001.jpg",
      imagePerso: "",
      description: "Contribue à la formation normale des globules rouges et au bon fonctionnement du système nerveux",
      bienfaits: ["Réduit la fatigue et l'épuisement", "Soutient le système nerveux et les fonctions cognitives", "Contribue à la formation des globules rouges", "Renforce le système immunitaire"],
      utilisation: "1 comprimé par jour au cours du repas avec un verre d'eau. Cure de 1 à 3 mois.",
      composition: "Vitamine B12 (cyanocobalamine) 1000µg"
    },
    {
      id: "comp-002",
      nom: "Fer Plus & Vit C",
      marque: "Vertu Plus",
      gamme: "Vitamines",
      prix: "",
      ancienPrix: "",
      badge: "",
      image: "images/gallery/photo-001.jpg",
      imagePerso: "",
      description: "Complément en fer hautement absorbable enrichi en vitamine C pour une meilleure assimilation",
      bienfaits: ["Combat l'anémie et la carence en fer", "La vitamine C améliore l'absorption du fer", "Réduit la fatigue chronique", "Soutient la formation de l'hémoglobine"],
      utilisation: "1 gélule par jour, de préférence le matin à jeun ou pendant le repas. Éviter le thé et le café 2h avant/après la prise.",
      composition: "Fer bisglycinate 28mg, Vitamine C 80mg, Acide folique"
    },
    {
      id: "comp-003", nom: "Magnésium Marin B6", marque: "Vertu Plus", gamme: "Minéraux", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-magnesium-b6.jpg", imagePerso: "", description: "Magnésium d'origine marine enrichi en vitamine B6 pour combattre le stress et la fatigue", bienfaits: ["Réduit le stress, l'anxiété et la nervosité", "Combat la fatigue physique et mentale", "Prévient les crampes et spasmes musculaires", "Améliore la qualité du sommeil"], utilisation: "2 gélules par jour, matin et soir, pendant le repas. Cure de 1 à 3 mois.", composition: "Magnésium marin 300mg, Vitamine B6 2mg"
    },
    { id: "comp-004", nom: "HSN Cheveux Peau Ongles", marque: "Sakai", gamme: "Beauté", prix: "", ancienPrix: "", badge: "NOUVEAU", image: "images/products/comp-hsn-sakai.jpg", imagePerso: "", description: "Formule complète pour la beauté des cheveux, de la peau et des ongles", bienfaits: ["Renforce les cheveux et réduit la chute", "Améliore l'éclat et la fermeté de la peau", "Fortifie les ongles cassants", "Apporte les nutriments essentiels à la beauté"], utilisation: "2 gélules par jour avec un grand verre d'eau pendant le repas. Cure de 3 mois.", composition: "Cystine, Biotine, Zinc, Sélénium, Vitamines B, Minéraux"
    },
    { id: "comp-005", nom: "Ginkgo Biloba", marque: "Vertu", gamme: "Phytothérapie", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-ginkgo.jpg", imagePerso: "", description: "Extrait de Ginkgo Biloba pour stimuler la mémoire et améliorer la circulation cérébrale", bienfaits: ["Améliore la mémoire et les capacités cognitives", "Favorise la circulation sanguine cérébrale", "Antioxydant puissant protégeant les neurones", "Aide à la concentration et à la vigilance"], utilisation: "1 à 2 gélules par jour, de préférence le matin pendant le petit-déjeuner.", composition: "Extrait de Ginkgo Biloba standardisé 120mg, Flavonoïdes 24%, Terpénoïdes 6%"
    },
    { id: "comp-006", nom: "Propolis Vitamine C", marque: "Spirit Pharma", gamme: "Immunité", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-propolis-vitc.jpg", imagePerso: "", description: "Association propolis et vitamine C pour renforcer les défenses immunitaires naturelles", bienfaits: ["Renforce le système immunitaire", "Propriétés antibactériennes et antivirales naturelles", "Protège les voies respiratoires", "Apporte de l'énergie et combat la fatigue hivernale"], utilisation: "1 ampoule ou 2 gélules par jour, le matin pendant le repas. Idéal en prévention aux changements de saison.", composition: "Extrait de Propolis 400mg, Vitamine C 180mg, Miel"
    },
    { id: "comp-007", nom: "Curcuma Plus", marque: "Vertu Plus", gamme: "Phytothérapie", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-curcuma.jpg", imagePerso: "", description: "Triple action curcuma, gingembre et poivre noir pour le confort articulaire et la digestion", bienfaits: ["Soulage les douleurs articulaires et l'inflammation", "Améliore la digestion et réduit les ballonnements", "Le poivre noir multiplie l'absorption du curcuma par 20", "Antioxydant naturel puissant"], utilisation: "1 gélule matin et soir pendant les repas. Cure de 2 à 3 mois pour les articulations.", composition: "Curcuma longa 500mg (curcumine 95%), Gingembre 100mg, Poivre noir (pipérine 5mg)"
    },
    { id: "comp-008", nom: "Diafit", marque: "Diafit", gamme: "Glycémie", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-diafit.jpg", imagePerso: "", description: "Complément naturel à base de plantes et de chrome pour aider à réguler la glycémie", bienfaits: ["Aide à maintenir un taux de glycémie normal", "Le chrome contribue au métabolisme des sucres", "Soutient la fonction pancréatique", "Réduit les envies de sucre"], utilisation: "1 gélule avant chaque repas principal (2 à 3/jour). À utiliser en complément du traitement médical, pas en remplacement.", composition: "Chrome 200µg, Extrait de cannelle, Gymnema sylvestre, Fenugrec, Berbérine"
    },
    { id: "comp-009", nom: "Oméga 3 EPA/DHA", marque: "NutriLab", gamme: "Oméga", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-omega3.jpg", imagePerso: "", description: "Huile de poisson concentrée en EPA et DHA pour la santé cardiovasculaire et cérébrale", bienfaits: ["Protège le cœur et les vaisseaux sanguins", "Soutient les fonctions cérébrales et la mémoire", "Réduit les triglycérides et le cholestérol", "Anti-inflammatoire naturel pour les articulations"], utilisation: "1 à 2 capsules par jour pendant le repas. Conserver au réfrigérateur après ouverture.", composition: "Huile de poisson 1000mg, EPA 360mg, DHA 240mg, Vitamine E"
    },
    { id: "comp-010", nom: "New Carti — Cartilage de Requin", marque: "New Carti", gamme: "Articulations", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-newcarti.jpg", imagePerso: "", description: "Cartilage de requin pur pour la souplesse articulaire et le renforcement des os", bienfaits: ["Soulage les douleurs articulaires liées à l'usure", "Source naturelle de chondroïtine et glucosamine", "Renforce le cartilage et ralentit sa dégradation", "Apporte calcium et phosphore pour les os"], utilisation: "2 à 3 gélules par jour avec les repas. Cure de 3 mois minimum pour des résultats durables.", composition: "Cartilage de requin 750mg, Chondroïtine sulfate, Glucosamine, Calcium, Phosphore"
    },
    { id: "comp-011", nom: "Spiruline Bio", marque: "NutriLab", gamme: "Superaliments", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-spiruline.jpg", imagePerso: "", description: "Spiruline biologique, superaliment riche en protéines, fer et vitamines pour l'énergie", bienfaits: ["Source exceptionnelle de protéines végétales (60%)", "Riche en fer facilement assimilable", "Booste l'énergie et combat la fatigue", "Détoxifie l'organisme et renforce l'immunité"], utilisation: "3 à 6 comprimés par jour, en augmentant progressivement. Prendre avec de l'eau pendant les repas.", composition: "Spiruline bio 500mg par comprimé, Protéines, Fer, Vitamine B12, Phycocyanine, Chlorophylle"
    },
    { id: "comp-012", nom: "Ashwagandha Bio", marque: "NutriLab", gamme: "Phytothérapie", prix: "", ancienPrix: "", badge: "NOUVEAU", image: "images/products/comp-ashwagandha.jpg", imagePerso: "", description: "Plante adaptogène ancestrale pour gérer le stress et améliorer le sommeil naturellement", bienfaits: ["Réduit le cortisol (hormone du stress) naturellement", "Améliore la qualité du sommeil", "Renforce l'endurance et la vitalité", "Soutient la santé thyroïdienne"], utilisation: "1 gélule le soir avant le coucher pour le sommeil, ou le matin pour l'énergie. Cure de 2 à 3 mois.", composition: "Ashwagandha bio (Withania somnifera) 600mg, Withanolides 5%"
    },
    { id: "comp-013", nom: "Vitamine D3+K2", marque: "Indoka (Newos)", gamme: "Vitamines", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-vitd3k2.jpg", imagePerso: "", description: "Duo vitamine D3 et K2 pour des os solides et un système immunitaire renforcé", bienfaits: ["Renforce les os et prévient l'ostéoporose", "La K2 dirige le calcium vers les os et non les artères", "Stimule le système immunitaire", "Essentiel en cas de faible exposition au soleil"], utilisation: "1 goutte ou 1 gélule par jour pendant le repas. Indispensable d'octobre à avril au Maroc.", composition: "Vitamine D3 1000 UI, Vitamine K2 (MK-7) 75µg"
    },
    { id: "comp-014", nom: "Magnésium Glycinate", marque: "NutriLab", gamme: "Minéraux", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-magnesium-glycinate.jpg", imagePerso: "", description: "Forme hautement biodisponible de magnésium avec camomille pour la relaxation", bienfaits: ["Absorption supérieure à l'oxyde de magnésium", "Relaxation musculaire et nerveuse", "Améliore le sommeil grâce à la camomille", "Ne provoque pas de troubles digestifs"], utilisation: "1 à 2 gélules le soir avant le coucher. Peut être pris quotidiennement sans interruption.", composition: "Magnésium bisglycinate 300mg, Extrait de camomille 100mg"
    },
    { id: "comp-015", nom: "Shilajit", marque: "Shilajit", gamme: "Énergie", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-shilajit.jpg", imagePerso: "", description: "Résine minérale himalayenne riche en acide fulvique pour l'énergie et la vitalité masculine", bienfaits: ["Booste l'énergie et l'endurance physique", "Riche en minéraux et acide fulvique", "Soutient la vitalité et la virilité", "Améliore l'absorption des nutriments"], utilisation: "1 gélule par jour le matin avec de l'eau tiède. Cure de 2 à 3 mois.", composition: "Shilajit purifié 500mg, Acide fulvique 50%, Minéraux traces"
    },
    { id: "comp-016", nom: "Pépins de Courge", marque: "MGD", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-pepins-courge.jpg", imagePerso: "", description: "Huile de pépins de courge bio pour le confort urinaire masculin et la prostate", bienfaits: ["Soutient la fonction prostatique chez l'homme", "Réduit les envies fréquentes d'uriner la nuit", "Riche en zinc essentiel pour la prostate", "Améliore le confort urinaire au quotidien"], utilisation: "2 gélules par jour pendant les repas, matin et soir. Cure de 2 mois minimum.", composition: "Huile de pépins de courge bio 500mg, Phytostérols, Zinc naturel"
    },
    { id: "comp-017", nom: "Collagène Marin", marque: "MGD", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-cartilage-requin.jpg", imagePerso: "", description: "Collagène marin hydrolysé pour la peau, les articulations et les tissus conjonctifs", bienfaits: ["Améliore l'élasticité et la fermeté de la peau", "Soutient la santé des articulations et du cartilage", "Renforce les ongles et les cheveux", "Hydrate la peau de l'intérieur"], utilisation: "2 gélules par jour ou 1 dose de poudre dans un verre d'eau. Cure de 3 mois pour des résultats visibles.", composition: "Collagène marin hydrolysé type I 500mg, Vitamine C, Acide hyaluronique"
    },
    { id: "comp-018", nom: "Cartilage de Requin", marque: "MGD", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-cartilage-requin.jpg", imagePerso: "", description: "Source naturelle de chondroïtine pour la souplesse articulaire et la santé des os", bienfaits: ["Protège et régénère le cartilage articulaire", "Soulage les douleurs articulaires", "Source naturelle de calcium et phosphore", "Maintient la mobilité et la souplesse"], utilisation: "2 gélules par jour pendant les repas. Cure de 3 mois, à renouveler si nécessaire.", composition: "Cartilage de requin 750mg, Chondroïtine sulfate 25%, Calcium, Phosphore"
    },
    { id: "comp-019", nom: "Nopal", marque: "MGD", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-nopal.jpg", imagePerso: "", description: "Figuier de Barbarie (cactus) bio pour le contrôle du poids et la satiété", bienfaits: ["Capte les graisses alimentaires dans l'estomac", "Favorise la sensation de satiété", "Régule le taux de sucre dans le sang", "Riche en fibres pour le transit intestinal"], utilisation: "2 gélules 30 minutes avant les 2 repas principaux avec un grand verre d'eau.", composition: "Nopal (Opuntia ficus-indica) bio 500mg, Fibres solubles"
    },
    { id: "comp-020", nom: "Sélénium", marque: "MGD", gamme: "Minéraux", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-selenium.jpg", imagePerso: "", description: "Oligo-élément antioxydant essentiel pour la protection cellulaire et la thyroïde", bienfaits: ["Puissant antioxydant protégeant les cellules", "Essentiel au bon fonctionnement de la thyroïde", "Renforce le système immunitaire", "Contribue à la santé des cheveux et des ongles"], utilisation: "1 gélule par jour pendant le repas. Ne pas dépasser la dose recommandée.", composition: "Sélénium (sélénométhionine) 100µg, Vitamine E"
    },
    { id: "comp-021", nom: "Super Collagène", marque: "Gleamy", gamme: "Collagène", prix: "", ancienPrix: "", badge: "NOUVEAU", image: "images/gallery/photo-004.jpg", imagePerso: "", description: "Collagène type 1 et 3 enrichi en vitamine C et zinc pour une peau radieuse et jeune", bienfaits: ["Réduit les rides et ridules visiblement", "Améliore l'hydratation et l'éclat de la peau", "Renforce les articulations et les tendons", "Le zinc et la vitamine C boostent la synthèse du collagène"], utilisation: "2 gélules par jour avec un verre d'eau, de préférence à jeun. Cure de 3 mois.", composition: "Collagène hydrolysé type I et III 1000mg, Vitamine C 80mg, Zinc 10mg"
    },
    { id: "comp-022", nom: "Collagène Type 1 et 3", marque: "Phor Max", gamme: "Collagène", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-004.jpg", imagePerso: "", description: "Collagène premium avec acide hyaluronique pour la peau, les ongles et les cheveux", bienfaits: ["Repulpe la peau et réduit les signes de l'âge", "L'acide hyaluronique hydrate en profondeur", "Renforce les ongles et stimule la pousse des cheveux", "Améliore l'élasticité cutanée"], utilisation: "1 à 2 gélules par jour à jeun avec de l'eau. Résultats visibles après 4 à 6 semaines.", composition: "Collagène marin type I et III 500mg, Acide hyaluronique 50mg, Vitamine C, Biotine"
    },
    { id: "comp-023", nom: "Great Forma", marque: "Great Forma", gamme: "Minceur", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-004.jpg", imagePerso: "", description: "Complément à base de maca et fenugrec pour sculpter la silhouette naturellement", bienfaits: ["Aide à sculpter les courbes naturellement", "Le fenugrec stimule l'appétit et la prise de poids ciblée", "La maca apporte énergie et vitalité", "Favorise un gain de poids harmonieux"], utilisation: "2 gélules par jour pendant les repas. Associer à une alimentation équilibrée. Cure de 2 à 3 mois.", composition: "Extrait de Maca 250mg, Fenugrec 250mg"
    },
    { id: "comp-024", nom: "Propolis", marque: "MGD", gamme: "Immunité", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-003.jpg", imagePerso: "", description: "Propolis d'abeille pure pour renforcer l'immunité et protéger le foie", bienfaits: ["Antibactérien et antiviral naturel", "Protège le foie et soutient sa détoxification", "Renforce les défenses immunitaires", "Riche en flavonoïdes antioxydants"], utilisation: "1 à 2 gélules par jour pendant les repas. Idéal en cure préventive avant l'hiver.", composition: "Extrait de Propolis 400mg, Flavonoïdes, Acides phénoliques"
    },
    { id: "comp-025", nom: "Chardon Marie Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-chardon-marie.jpg", imagePerso: "", description: "Plante hépatoprotectrice bio pour détoxifier et régénérer le foie", bienfaits: ["Protège et régénère les cellules du foie", "Favorise l'élimination des toxines", "La silymarine est un puissant antioxydant hépatique", "Aide à la digestion des graisses"], utilisation: "2 gélules par jour avant les repas. Cure détox de 3 semaines, renouvelable aux changements de saison.", composition: "Chardon Marie bio (Silybum marianum) 400mg, Silymarine 80%"
    },
    { id: "comp-026", nom: "Vigne Rouge Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-vigne-rouge.jpg", imagePerso: "", description: "Extrait de vigne rouge bio pour une bonne circulation veineuse et des jambes légères", bienfaits: ["Soulage les jambes lourdes et fatiguées", "Renforce la paroi des veines et capillaires", "Réduit les gonflements des chevilles", "Améliore le retour veineux"], utilisation: "2 gélules par jour, matin et soir. Particulièrement utile en été et en cas de station debout prolongée.", composition: "Vigne rouge bio (Vitis vinifera) 300mg, Polyphénols, Anthocyanines, OPC"
    },
    { id: "comp-027", nom: "Ginkgo Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-ginkgo-bio.jpg", imagePerso: "", description: "Ginkgo biloba bio pour la mémoire, la concentration et la circulation cérébrale", bienfaits: ["Stimule la mémoire et les fonctions cognitives", "Améliore la micro-circulation cérébrale", "Protège les cellules nerveuses du vieillissement", "Aide à la concentration et à la clarté mentale"], utilisation: "2 gélules par jour le matin. Particulièrement recommandé pour les étudiants et les seniors.", composition: "Ginkgo Biloba bio 300mg, Flavonoïdes 24%, Ginkgolides 6%"
    },
    { id: "comp-028", nom: "Radis Noir Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-radis-noir.jpg", imagePerso: "", description: "Radis noir bio pour une détox hépatique naturelle et une meilleure digestion", bienfaits: ["Stimule la production de bile pour mieux digérer", "Détoxifie le foie après les excès alimentaires", "Facilite l'élimination des déchets", "Soulage les ballonnements et la lourdeur digestive"], utilisation: "1 à 2 gélules avant les repas principaux. Cure de 3 semaines, idéale après les fêtes ou excès.", composition: "Radis noir bio (Raphanus sativus niger) 500mg, Glucosinolates"
    },
    { id: "comp-029", nom: "Coenzyme Q10 Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-coenzyme-q10.jpg", imagePerso: "", description: "Coenzyme Q10 antioxydant pour l'énergie cellulaire et la protection cardiovasculaire", bienfaits: ["Produit de l'énergie au niveau cellulaire", "Protège le cœur et les vaisseaux sanguins", "Antioxydant puissant anti-âge", "Compense la baisse naturelle de Q10 après 40 ans"], utilisation: "1 gélule par jour pendant le repas. Particulièrement recommandé après 40 ans.", composition: "Coenzyme Q10 (ubiquinone) 100mg, Vitamine E"
    },
    { id: "comp-030", nom: "Maca Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-maca-bio.jpg", imagePerso: "", description: "Maca péruvienne bio pour booster l'énergie, la vitalité et l'endurance", bienfaits: ["Augmente l'énergie et l'endurance physique", "Stimule la libido chez l'homme et la femme", "Aide à l'équilibre hormonal", "Riche en protéines, fer et zinc"], utilisation: "2 gélules par jour le matin avec le petit-déjeuner. Cure de 2 à 3 mois.", composition: "Maca bio (Lepidium meyenii) 500mg, Macamides, Macaènes"
    },
    { id: "comp-031", nom: "Fucus Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-fucus-bio.jpg", imagePerso: "", description: "Algue marine bio riche en iode pour stimuler le métabolisme et favoriser la minceur", bienfaits: ["Stimule le métabolisme grâce à l'iode naturel", "Favorise la combustion des graisses", "Apporte des minéraux marins essentiels", "Effet coupe-faim naturel grâce aux fibres d'algue"], utilisation: "2 gélules 30 minutes avant les repas avec un grand verre d'eau. Déconseillé en cas de problème thyroïdien.", composition: "Fucus vesiculosus bio 400mg, Iode naturel, Alginates, Minéraux marins"
    },
    { id: "comp-032", nom: "Fenugrec Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-fenugrec-bio.jpg", imagePerso: "", description: "Fenugrec bio pour stimuler l'appétit, favoriser la prise de poids et la lactation", bienfaits: ["Stimule l'appétit naturellement", "Favorise une prise de poids saine", "Stimule la production de lait maternel", "Aide à réguler la glycémie"], utilisation: "2 gélules par jour pendant les repas. Pour la prise de poids : prendre avant les repas. Pour la lactation : après les repas.", composition: "Fenugrec bio (Trigonella foenum-graecum) 500mg, Saponines, Fibres"
    },
    { id: "comp-033", nom: "Curcuma Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-curcuma-bio.jpg", imagePerso: "", description: "Curcuma bio anti-inflammatoire naturel pour le confort articulaire et digestif", bienfaits: ["Puissant anti-inflammatoire naturel", "Soulage les douleurs articulaires et musculaires", "Améliore la digestion et protège l'estomac", "Antioxydant protégeant les cellules du vieillissement"], utilisation: "2 gélules par jour pendant les repas. Associer à du poivre noir ou des matières grasses pour une meilleure absorption.", composition: "Curcuma bio (Curcuma longa) 500mg, Curcumine 95%"
    },
    { id: "comp-034", nom: "Guarana Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-guarana-bio.jpg", imagePerso: "", description: "Guarana bio stimulant naturel pour l'énergie, les performances physiques et la concentration", bienfaits: ["Énergie durable sans les effets du café", "Stimule la concentration et la vigilance", "Accélère le métabolisme pour brûler les graisses", "Réduit la fatigue physique et mentale"], utilisation: "1 gélule le matin, éventuellement 1 autre à midi. Ne pas prendre après 16h. Déconseillé aux personnes sensibles à la caféine.", composition: "Guarana bio (Paullinia cupana) 400mg, Caféine naturelle 12%"
    },
    { id: "comp-035", nom: "Acide Hyaluronique Bio", marque: "MGD Bio", gamme: "Phytothérapie Bio", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-acide-hyaluronique.jpg", imagePerso: "", description: "Acide hyaluronique naturel pour hydrater la peau en profondeur et maintenir la jeunesse cutanée", bienfaits: ["Hydrate la peau de l'intérieur en profondeur", "Repulpe la peau et réduit les rides", "Lubrifie les articulations naturellement", "Maintient l'élasticité et la souplesse de la peau"], utilisation: "1 gélule par jour avec un grand verre d'eau, à jeun ou pendant le repas. Cure de 3 mois.", composition: "Acide hyaluronique naturel 120mg, Vitamine C 60mg"
    },
    { id: "comp-036", nom: "Huile de Morue Oméga 3", marque: "MGD", gamme: "Oméga", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-huile-morue.jpg", imagePerso: "", description: "Huile de foie de morue riche en oméga 3, vitamines A et D pour la santé globale", bienfaits: ["Riche en oméga 3 pour le cœur et les artères", "Source naturelle de vitamine D pour les os", "La vitamine A protège la vision et la peau", "Renforce le système immunitaire"], utilisation: "1 à 2 capsules par jour pendant le repas principal. Idéal en hiver pour compenser le manque de soleil.", composition: "Huile de foie de morue 500mg, EPA, DHA, Vitamine A 800µg, Vitamine D3 5µg"
    },
    { id: "comp-037", nom: "Gelée Royale", marque: "MGD", gamme: "Énergie", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-gelee-royale.jpg", imagePerso: "", description: "Gelée royale pure pour la vitalité, l'énergie et le renforcement des défenses immunitaires", bienfaits: ["Booste l'énergie et combat la fatigue profonde", "Renforce les défenses immunitaires", "Stimule l'appétit et le tonus général", "Riche en vitamines B, acides aminés et minéraux"], utilisation: "1 ampoule ou 2 gélules le matin à jeun. Cure de 3 semaines aux changements de saison.", composition: "Gelée Royale lyophilisée 1000mg, 10-HDA (acide gras spécifique), Vitamines B"
    },
    { id: "comp-038", nom: "Extralevure Vitalité", marque: "Extralevure", gamme: "Vitalité", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-extralevure.jpg", imagePerso: "", description: "Levure de bière enrichie en sélénium pour la beauté de la peau, des ongles et des cheveux", bienfaits: ["Renforce les cheveux et réduit leur chute", "Fortifie les ongles cassants et dédoublés", "Améliore l'éclat de la peau", "Le sélénium protège les cellules du stress oxydatif"], utilisation: "2 comprimés par jour pendant les repas. Cure de 2 à 3 mois.", composition: "Levure de bière 500mg, Sélénium 50µg, Vitamines du groupe B"
    },
    { id: "comp-039", nom: "Pack Bio Vitalité", marque: "Indoka", gamme: "Packs", prix: "", ancienPrix: "", badge: "PROMO", image: "images/products/comp-pack-vitalite.jpg", imagePerso: "", description: "Pack complet de compléments bio pour la vitalité, l'énergie et le bien-être quotidien", bienfaits: ["Combinaison synergique pour une vitalité maximale", "Couvre les besoins en vitamines et minéraux essentiels", "Booste l'énergie tout au long de la journée", "Formule bio certifiée sans additifs chimiques"], utilisation: "Suivre les indications de chaque produit du pack. Prendre pendant les repas. Cure de 1 à 3 mois.", composition: "Pack de plusieurs compléments bio : multivitamines, magnésium, oméga 3"
    },
    { id: "comp-040", nom: "Pack Glamour Masse", marque: "Indoka", gamme: "Packs", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-pack-glamour.jpg", imagePerso: "", description: "Pack conçu pour la prise de masse harmonieuse et la beauté du corps", bienfaits: ["Favorise la prise de poids et de masse", "Sculpte les courbes naturellement", "Nourrit la peau de l'intérieur", "Apporte énergie et vitalité"], utilisation: "Suivre les indications de chaque produit du pack. Associer à une alimentation riche et équilibrée.", composition: "Pack : Fenugrec, Maca, Protéines, Vitamines"
    },
    { id: "comp-041", nom: "Pack Beauté", marque: "Indoka", gamme: "Packs", prix: "", ancienPrix: "", badge: "", image: "images/products/comp-pack-beaute.jpg", imagePerso: "", description: "Pack beauté complet pour la peau, les cheveux et les ongles", bienfaits: ["Améliore l'éclat et la fermeté de la peau", "Renforce les cheveux et stimule la pousse", "Fortifie les ongles fragiles", "Hydrate et nourrit de l'intérieur"], utilisation: "Suivre les indications de chaque produit du pack. Cure de 3 mois pour des résultats optimaux.", composition: "Pack : Collagène, Biotine, Zinc, Vitamine C, Acide hyaluronique"
    },
  ],

  // ─────────────────────────────────────────
  // GAMME DOPPEL HERZ AKTIV
  // ─────────────────────────────────────────
  doppelherz: [
    {
      id: "dh-001", nom: "Aktiv Oméga-3 Marin", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-aktiv-omega3.jpg", imagePerso: "", description: "Oméga 3 marin concentré avec vitamine E pour la santé cardiovasculaire", bienfaits: ["Protège le cœur et les vaisseaux sanguins", "Réduit les triglycérides sanguins", "Soutient les fonctions cérébrales", "La vitamine E antioxydante protège les cellules"], utilisation: "1 capsule par jour pendant le repas. Qualité pharmaceutique allemande.", composition: "Huile de poisson 800mg, EPA 180mg, DHA 120mg, Vitamine E 12mg"
    },
    { id: "dh-002", nom: "Aktiv Lacto-Pro", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-lacto-pro.jpg", imagePerso: "", description: "Probiotiques pour rétablir et maintenir la flore intestinale", bienfaits: ["Rétablit l'équilibre de la flore intestinale", "Améliore la digestion et réduit les ballonnements", "Renforce les défenses immunitaires intestinales", "Idéal après un traitement antibiotique"], utilisation: "1 gélule par jour, de préférence le matin à jeun. Cure de 4 semaines.", composition: "Lactobacillus, Bifidobacterium, 10 milliards UFC, Inuline prébiotique"
    },
    { id: "dh-003", nom: "Aktiv Detox", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-aktiv-detox.jpg", imagePerso: "", description: "Programme détox pour purifier le foie et l'organisme en profondeur", bienfaits: ["Détoxifie le foie et les reins", "Élimine les toxines accumulées", "Améliore le teint et l'énergie", "Soutient les fonctions d'élimination"], utilisation: "1 ampoule par jour diluée dans un verre d'eau, le matin à jeun. Cure de 20 jours.", composition: "Artichaut, Pissenlit, Chardon-Marie, Bouleau, Vitamine B6"
    },
    { id: "dh-004", nom: "A-Z Dépôt", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-az-depot.jpg", imagePerso: "", description: "Multivitamines complet avec 23 vitamines et minéraux essentiels à libération prolongée", bienfaits: ["Couvre 100% des besoins quotidiens en vitamines", "Technologie dépôt : libération progressive sur 12h", "Combat la fatigue et renforce l'immunité", "Convient à toute la famille adulte"], utilisation: "1 comprimé par jour au petit-déjeuner avec de l'eau. Ne pas croquer.", composition: "Vitamines A, B1-B12, C, D, E, K, Fer, Zinc, Sélénium, Magnésium, Chrome, Iode"
    },
    { id: "dh-005", nom: "Men Aktiv", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-men-aktiv.jpg", imagePerso: "", description: "Complément spécialement formulé pour la vitalité et la santé masculine", bienfaits: ["Soutient la vitalité et l'énergie masculine", "Le zinc contribue au maintien de la testostérone", "Le sélénium protège les cellules reproductrices", "Ginseng pour l'endurance et la performance"], utilisation: "1 gélule par jour pendant le repas. Cure de 2 à 3 mois.", composition: "Zinc 15mg, Sélénium 55µg, Ginseng 100mg, Vitamine E, L-Arginine"
    },
    { id: "dh-006", nom: "Zinc + Histidine + Vitamine C", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-006.jpg", imagePerso: "", description: "Zinc hautement biodisponible pour renforcer le système immunitaire", bienfaits: ["Renforce les défenses immunitaires", "L'histidine améliore l'absorption du zinc", "La vitamine C booste l'immunité", "Protège la peau, les cheveux et les ongles"], utilisation: "1 comprimé par jour au repas. Particulièrement utile en automne et hiver.", composition: "Zinc 15mg, L-Histidine 100mg, Vitamine C 300mg"
    },
    { id: "dh-007", nom: "Mémorit", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "NOUVEAU", image: "images/products/dh-memorit.jpg", imagePerso: "", description: "Lécithine et vitamines B pour la mémoire, la concentration et les performances mentales", bienfaits: ["Améliore la mémoire et la concentration", "La lécithine nourrit les cellules cérébrales", "Les vitamines B soutiennent le système nerveux", "Idéal pour étudiants et seniors"], utilisation: "1 gélule par jour le matin avec le petit-déjeuner.", composition: "Lécithine de soja 1200mg, Vitamines B1, B6, B12, Acide folique"
    },
    { id: "dh-008", nom: "Aktiv-Sélénium", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-selenium.jpg", imagePerso: "", description: "Sélénium et vitamine E antioxydants pour protéger les cellules du vieillissement", bienfaits: ["Protection antioxydante des cellules", "Soutient la fonction thyroïdienne", "Renforce le système immunitaire", "Protège la peau du vieillissement prématuré"], utilisation: "1 comprimé par jour pendant le repas.", composition: "Sélénium 100µg, Vitamine E 36mg, Vitamine C"
    },
    { id: "dh-009", nom: "Uricalm", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-uricalm.jpg", imagePerso: "", description: "Extrait de canneberge pour le confort urinaire et la prévention des infections", bienfaits: ["Prévient les infections urinaires récurrentes", "La canneberge empêche les bactéries d'adhérer", "Favorise le confort urinaire quotidien", "Riche en antioxydants naturels"], utilisation: "1 gélule par jour avec un grand verre d'eau. Boire au moins 1.5L d'eau par jour.", composition: "Extrait de Canneberge 400mg, Proanthocyanidines (PAC) 36mg, Vitamine C"
    },
    { id: "dh-010", nom: "Harmonivit", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-harmonivit.jpg", imagePerso: "", description: "Ginkgo et mélisse pour le bien-être mental, l'harmonie et la sérénité", bienfaits: ["Favorise la détente et réduit le stress", "Le ginkgo améliore la circulation cérébrale", "La mélisse apaise et favorise le sommeil", "Soutient l'équilibre émotionnel"], utilisation: "1 gélule par jour, de préférence le soir. Cure de 4 à 8 semaines.", composition: "Ginkgo biloba 120mg, Mélisse 80mg, Vitamines B1, B6, B12"
    },
    { id: "dh-011", nom: "Prostacalm", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-prostacalm.jpg", imagePerso: "", description: "Formule à base de palmier nain pour le confort prostatique masculin", bienfaits: ["Soutient la fonction prostatique normale", "Réduit les envies fréquentes d'uriner", "Le palmier nain aide à maintenir la prostate en bonne santé", "Le zinc contribue au métabolisme hormonal"], utilisation: "1 gélule par jour pendant le repas. Recommandé pour les hommes de plus de 45 ans.", composition: "Saw Palmetto (Palmier nain) 320mg, Zinc 5mg, Sélénium, Vitamine E"
    },
    { id: "dh-012", nom: "Osseovit — Magnésium + Ca", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-osseovit.jpg", imagePerso: "", description: "Calcium et magnésium avec vitamines pour des os solides et une bonne santé musculaire", bienfaits: ["Renforce les os et prévient l'ostéoporose", "Le magnésium soutient la fonction musculaire", "Les vitamines D et K dirigent le calcium vers les os", "Prévient les crampes et la fatigue musculaire"], utilisation: "1 comprimé par jour pendant le repas. Particulièrement important pour les femmes après 50 ans.", composition: "Calcium 400mg, Magnésium 100mg, Vitamines B6, C, E, D3, K"
    },
    { id: "dh-013", nom: "Oméga-3 Junior", marque: "Doppel Herz", gamme: "Doppel Herz Aktiv", prix: "", ancienPrix: "", badge: "", image: "images/products/dh-omega3-junior.jpg", imagePerso: "", description: "Multi-vitamines pour enfants avec DHA et 11 vitamines essentielles à la croissance", bienfaits: ["Le DHA soutient le développement cérébral de l'enfant", "11 vitamines pour une croissance harmonieuse", "Renforce le système immunitaire des enfants", "Bon goût fruité apprécié des enfants"], utilisation: "1 capsule à mâcher par jour pour les enfants à partir de 4 ans. Goût fruité.", composition: "DHA 100mg, Vitamines A, B1, B2, B6, B12, C, D, E, Niacine, Acide folique, Biotine"
    },
  ],

  // ─────────────────────────────────────────
  // APPAREILS MÉDICAUX
  // ─────────────────────────────────────────
  appareils: [
    {
      id: "app-001", nom: "Tensiomètre M3 Comfort", marque: "Omron", gamme: "Tensiomètres", prix: "", ancienPrix: "", badge: "", image: "images/products/app-omron-m3.jpg", imagePerso: "", description: "Tensiomètre automatique avec brassard Intelli Wrap pour 2 utilisateurs", bienfaits: ["Brassard Intelli Wrap : mesure précise quelle que soit la position", "Mémoire pour 2 utilisateurs (60 mesures chacun)", "Détection automatique de l'arythmie cardiaque", "Indicateur de mise en place correcte du brassard"], utilisation: "Asseyez-vous calmement 5 minutes avant la mesure. Placez le brassard sur le bras gauche au niveau du cœur. Appuyez sur Start. Ne bougez pas pendant la mesure.", composition: "Inclus : appareil, brassard Intelli Wrap 22-42cm, piles, étui, notice"
    },
    { id: "app-002", nom: "Tensiomètre M2 Basic", marque: "Omron", gamme: "Tensiomètres", prix: "", ancienPrix: "", badge: "", image: "images/products/app-omron-m2.jpg", imagePerso: "", description: "Tensiomètre automatique bras validé cliniquement, simple et fiable", bienfaits: ["Validé cliniquement pour des mesures précises", "Détection des battements cardiaques irréguliers", "Grand écran LCD facile à lire", "30 mesures en mémoire avec date et heure"], utilisation: "Mesurer le matin à jeun et le soir avant le coucher. Toujours sur le même bras. Noter les résultats pour votre médecin.", composition: "Inclus : appareil, brassard standard 22-32cm, piles, notice"
    },
    { id: "app-003", nom: "Tensiomètre Gentle+", marque: "Microlife", gamme: "Tensiomètres", prix: "", ancienPrix: "", badge: "NOUVEAU", image: "images/products/app-microlife.jpg", imagePerso: "", description: "Tensiomètre avec technologie Gentle pour un gonflage doux et confortable", bienfaits: ["Technologie Gentle : gonflage doux sans douleur", "Détection PAD (maladie artérielle périphérique)", "99 mémoires avec moyenne automatique", "Indicateur OMS de classification de la tension"], utilisation: "Idéal pour les personnes sensibles au gonflage du brassard. Suivre les mêmes recommandations de mesure que les autres tensiomètres.", composition: "Inclus : appareil, brassard confort 22-42cm, piles, étui, notice"
    },
    { id: "app-004", nom: "Thermomètre Auriculaire et Frontal", marque: "Darcare", gamme: "Thermomètres", prix: "", ancienPrix: "", badge: "", image: "images/products/app-thermometre.jpg", imagePerso: "", description: "Thermomètre infrarouge 2-en-1 pour mesure auriculaire et frontale instantanée", bienfaits: ["Double usage : oreille et front", "Résultat en 1 seconde", "Alarme de fièvre avec rétro-éclairage rouge", "20 mesures en mémoire pour suivi"], utilisation: "Mode frontal : placer à 3-5cm du front. Mode auriculaire : insérer doucement dans le conduit auditif. Attendre le bip.", composition: "Inclus : thermomètre, capuchons auriculaires, piles, étui, notice"
    },
    { id: "app-005", nom: "Glucomètre Accu-Chek Active", marque: "Roche", gamme: "Glucomètres", prix: "", ancienPrix: "", badge: "", image: "images/products/app-accuchek.jpg", imagePerso: "", description: "Glucomètre de référence Roche pour le contrôle précis de la glycémie au quotidien", bienfaits: ["Résultat en 5 secondes seulement", "Grand écran rétro-éclairé facile à lire", "500 mesures en mémoire avec moyennes", "Marqueurs avant/après repas"], utilisation: "Se laver les mains, piquer le bout du doigt avec l'autopiqueur, déposer la goutte de sang sur la bandelette insérée dans l'appareil.", composition: "Inclus : glucomètre, autopiqueur, 10 lancettes, 10 bandelettes, étui, notice"
    },
    { id: "app-006", nom: "Glucomètre On Call Plus", marque: "On Call", gamme: "Glucomètres", prix: "", ancienPrix: "", badge: "", image: "images/products/app-oncall.jpg", imagePerso: "", description: "Glucomètre fiable et abordable avec résultat rapide en 10 secondes", bienfaits: ["Prix abordable pour un suivi quotidien", "Résultat fiable en 10 secondes", "Bandelettes économiques et disponibles", "Mémoire de 300 mesures"], utilisation: "Même procédure que les autres glucomètres. Vérifier régulièrement la calibration avec la solution de contrôle.", composition: "Inclus : glucomètre, autopiqueur, 25 bandelettes, lancettes, étui"
    },
    { id: "app-007", nom: "Glucomètre Acare KF-B12", marque: "Acare", gamme: "Glucomètres", prix: "", ancienPrix: "", badge: "", image: "images/products/app-acare.jpg", imagePerso: "", description: "Glucomètre ultra-rapide nécessitant un échantillon de sang minimal", bienfaits: ["Résultat ultra-rapide en 5 secondes", "Micro-échantillon de seulement 0.8µl de sang", "Grand écran avec gros chiffres", "Auto-codage des bandelettes"], utilisation: "Piquer sur le côté du doigt pour moins de douleur. L'échantillon minimal réduit l'inconfort de la mesure.", composition: "Inclus : glucomètre, autopiqueur, 50 bandelettes, 50 lancettes, étui"
    },
    { id: "app-008", nom: "Oxymètre de Pouls", marque: "Nohero", gamme: "Oxymètres", prix: "", ancienPrix: "", badge: "", image: "images/products/app-oxymetre.jpg", imagePerso: "", description: "Oxymètre de doigt pour mesurer la saturation en oxygène et le pouls", bienfaits: ["Mesure la SpO2 (saturation en oxygène) instantanément", "Affiche la fréquence cardiaque en temps réel", "Écran couleur rétro-éclairé lisible", "Compact et portable, fonctionne sur piles"], utilisation: "Placer le doigt (index ou majeur) dans le clip. Attendre quelques secondes. SpO2 normale : 95-100%. Consulter si inférieur à 94%.", composition: "Inclus : oxymètre, cordon tour de cou, piles AAA, notice"
    },
  ],

  // ─────────────────────────────────────────
  // PRODUITS ORTHOPÉDIQUES
  // ─────────────────────────────────────────
  orthopediques: [
    {
      id: "ort-001", nom: "Genouillère Stabilisatrice", marque: "Thuasne", gamme: "Membres inférieurs", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-050.jpg", imagePerso: "", description: "Genouillère élastique de maintien pour le sport et le quotidien", bienfaits: ["Stabilise le genou pendant l'effort", "Soulage les douleurs liées à l'arthrose", "Compression élastique réduisant le gonflement", "Maintien latéral pour prévenir les entorses"], utilisation: "Enfiler sur le genou, ajuster la compression. Porter pendant l'activité physique ou la marche prolongée. Retirer la nuit.", composition: "Tissu élastique respirant, baleines latérales de stabilisation"
    },
    { id: "ort-002", nom: "Ceinture Lombaire", marque: "Gibaud", gamme: "Dos & Colonne", prix: "", ancienPrix: "", badge: "", image: "images/products/ort-ceinture-lombaire.jpg", imagePerso: "", description: "Ceinture de maintien lombaire pour soulager et prévenir les douleurs dorsales", bienfaits: ["Soutient la région lombaire et réduit la douleur", "Corrige la posture en position assise et debout", "Prévient les lumbagos et sciatiques", "Maintien ajustable par bandes velcro"], utilisation: "Placer la ceinture au niveau des lombaires, ajuster le serrage. Porter lors des activités sollicitant le dos. Limiter à 4-6h/jour.", composition: "Textile élastique, baleines dorsales semi-rigides, fermeture velcro"
    },
    { id: "ort-003", nom: "Semelles Orthopédiques", marque: "Scholl", gamme: "Membres inférieurs", prix: "", ancienPrix: "", badge: "NOUVEAU", image: "images/gallery/photo-050.jpg", imagePerso: "", description: "Semelles gel pour un confort optimal des pieds tout au long de la journée", bienfaits: ["Absorption des chocs à chaque pas", "Soulagement des douleurs plantaires", "Technologie gel pour un confort longue durée", "Convient à la plupart des chaussures"], utilisation: "Retirer la semelle d'origine de la chaussure et la remplacer. Découper si nécessaire selon les repères de taille.", composition: "Gel polyuréthane, mousse mémoire de forme, tissu anti-odeur"
    },
    { id: "ort-004", nom: "Chevillère Élastique", marque: "Thuasne", gamme: "Membres inférieurs", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-050.jpg", imagePerso: "", description: "Chevillère de maintien élastique pour la prévention et la récupération après entorse", bienfaits: ["Maintient la cheville fragilisée après une entorse", "Compression contrôlée réduisant l'œdème", "Prévention des récidives d'entorse", "Légère et discrète sous les chaussures"], utilisation: "Enfiler sur la cheville, ajuster le serrage. Porter pendant les activités à risque. Retirer pour dormir.", composition: "Tissu élastique fin, renforts latéraux, sans couture irritante"
    },
    { id: "ort-005", nom: "Béquilles Réglables", marque: "Medisport", gamme: "Mobilité", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-050.jpg", imagePerso: "", description: "Béquilles en aluminium ultra-légères et réglables en hauteur", bienfaits: ["Aluminium léger pour un déplacement facile", "Hauteur réglable s'adaptant à toutes les tailles", "Poignées ergonomiques anti-dérapantes", "Embouts antidérapants pour toutes surfaces"], utilisation: "Régler la hauteur : le haut de la béquille doit arriver 5cm sous l'aisselle. Avancer la béquille puis la jambe valide.", composition: "Aluminium anodisé, poignées caoutchouc, embouts antidérapants remplaçables"
    },
    { id: "ort-006", nom: "Collier Cervical", marque: "Gibaud", gamme: "Dos & Colonne", prix: "", ancienPrix: "", badge: "", image: "images/products/ort-collier-cervical.jpg", imagePerso: "", description: "Collier cervical souple pour le maintien et le soulagement des cervicales", bienfaits: ["Maintien doux des cervicales", "Soulage les douleurs du cou et de la nuque", "Réduit les contractures musculaires", "Léger et confortable à porter"], utilisation: "Placer le collier autour du cou, fermer à l'arrière. Porter selon prescription médicale. Généralement 2 à 4h par jour maximum.", composition: "Mousse polyuréthane, housse coton amovible et lavable, fermeture velcro"
    },
  ],

  // ─────────────────────────────────────────
  // MÉDICAMENTS (affiché sans prix)
  // ─────────────────────────────────────────
  medicaments: [
    { id: "med-001", nom: "Doliprane", categorie: "Antidouleur", image: "images/gallery/photo-300.jpg", imagePerso: "", description: "Paracétamol — Antidouleur et antipyrétique de référence", surOrdonnance: false, bienfaits: ["Soulage la douleur légère à modérée", "Réduit la fièvre efficacement", "Bien toléré par la majorité des patients", "Disponible en plusieurs dosages"], utilisation: "1 à 2 comprimés (500mg-1g) toutes les 4 à 6 heures. Maximum 3g/jour chez l'adulte. Ne pas dépasser la dose prescrite." },
    { id: "med-002", nom: "Vitamines & Compléments", categorie: "Compléments", image: "images/gallery/photo-300.jpg", imagePerso: "", description: "Large gamme de vitamines et compléments alimentaires disponibles sans ordonnance", surOrdonnance: false, bienfaits: ["Comblent les carences nutritionnelles", "Renforcent l'immunité et la vitalité", "Adaptés à tous les âges", "Conseils personnalisés par le pharmacien"], utilisation: "Demandez conseil au pharmacien pour choisir le complément adapté à vos besoins." },
    { id: "med-003", nom: "Antitussifs & Expectorants", categorie: "ORL", image: "images/gallery/photo-300.jpg", imagePerso: "", description: "Médicaments pour soulager la toux sèche ou grasse et dégager les voies respiratoires", surOrdonnance: false, bienfaits: ["Calme la toux sèche irritante", "Fluidifie les sécrétions en cas de toux grasse", "Dégage les voies respiratoires", "Soulagement rapide des symptômes du rhume"], utilisation: "Toux sèche : antitussif. Toux grasse : expectorant. Ne jamais combiner les deux. Consulter si la toux persiste plus de 5 jours." },
    { id: "med-004", nom: "Pansements & Premiers Soins", categorie: "Soins", image: "images/gallery/photo-300.jpg", imagePerso: "", description: "Matériel de premiers soins : pansements, compresses, sparadrap et bandes", surOrdonnance: false, bienfaits: ["Protège les plaies des infections", "Favorise la cicatrisation", "Gamme complète pour tous types de blessures", "Matériel stérile et hypoallergénique"], utilisation: "Nettoyer la plaie à l'eau et au savon ou au sérum physiologique, désinfecter, puis appliquer le pansement adapté." },
    { id: "med-005", nom: "Médicaments sur Ordonnance", categorie: "Prescription", image: "images/gallery/photo-300.jpg", imagePerso: "", description: "Médicaments délivrés uniquement sur présentation d'une ordonnance médicale valide", surOrdonnance: true, bienfaits: ["Traitements spécifiques prescrits par votre médecin", "Délivrés avec les conseils du pharmacien", "Suivi personnalisé de votre traitement", "Possibilité de commande si non disponible en stock"], utilisation: "Présenter votre ordonnance au comptoir. Le pharmacien vous expliquera la posologie et les précautions à prendre." },
    { id: "med-006", nom: "Antiseptiques & Désinfectants", categorie: "Soins", image: "images/gallery/photo-300.jpg", imagePerso: "", description: "Solutions antiseptiques pour la désinfection des plaies, mains et surfaces", surOrdonnance: false, bienfaits: ["Élimine les bactéries et germes pathogènes", "Prévient l'infection des plaies", "Désinfection rapide et efficace", "Plusieurs formats : spray, solution, lingettes"], utilisation: "Plaies : nettoyer d'abord, puis appliquer l'antiseptique du centre vers l'extérieur. Mains : frictionner 30 secondes." },
  ],

  // ─────────────────────────────────────────
  // PRODUITS ENFANTS & BÉBÉ
  // ─────────────────────────────────────────
  enfants: [
    { id: "enf-001", nom: "Lait Infantile 1er Âge", marque: "Gallia", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-150.jpg", imagePerso: "", description: "Lait en poudre adapté aux besoins nutritionnels du nourrisson de 0 à 6 mois", bienfaits: ["Formule adaptée aux besoins du nouveau-né", "Enrichi en DHA pour le développement cérébral", "Protéines de lait facilement digestibles", "Complète l'allaitement ou le remplace si nécessaire"], utilisation: "Suivre le tableau de dosage selon l'âge du bébé. 1 mesurette rase pour 30ml d'eau. Utiliser de l'eau faiblement minéralisée.", composition: "Protéines de lait, lactose, huiles végétales, DHA, vitamines et minéraux" },
    { id: "enf-002", nom: "Lait Infantile 2ème Âge", marque: "Blédina", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-150.jpg", imagePerso: "", description: "Lait de suite adapté à la diversification alimentaire de 6 à 12 mois", bienfaits: ["Accompagne la diversification alimentaire", "Enrichi en fer essentiel à la croissance", "Apport en calcium pour des os solides", "Complète les repas diversifiés du bébé"], utilisation: "2 à 3 biberons par jour en complément des repas diversifiés. Même préparation que le lait 1er âge.", composition: "Protéines de lait, fer, calcium, DHA, vitamines A, C, D" },
    { id: "enf-003", nom: "Couches Bébé", marque: "Pampers", prix: "", ancienPrix: "", badge: "PROMO", image: "images/gallery/photo-150.jpg", imagePerso: "", description: "Couches ultra-absorbantes avec protection anti-fuites jusqu'à 12 heures", bienfaits: ["Protection anti-fuites 12 heures jour et nuit", "Canaux absorbants répartissant l'humidité", "Voile supérieur doux pour la peau de bébé", "Indicateur d'humidité changeant de couleur"], utilisation: "Changer la couche toutes les 2-3 heures ou dès qu'elle est souillée. Nettoyer la peau de bébé à chaque change.", composition: "Cellulose, polymère super-absorbant, voile non-tissé hypoallergénique" },
    { id: "enf-004", nom: "Crème Change Bébé", marque: "Mustela", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-150.jpg", imagePerso: "", description: "Crème protectrice et réparatrice pour la zone du change, prévient les rougeurs", bienfaits: ["Protège la peau fragile des fesses de bébé", "Isole la peau de l'humidité et des irritants", "Apaise et répare les rougeurs du siège", "Formule hypoallergénique haute tolérance"], utilisation: "Appliquer une couche épaisse sur les fesses propres et sèches de bébé à chaque change.", composition: "Oxyde de zinc, beurre de karité, perséose d'avocat, huile de tournesol" },
    { id: "enf-005", nom: "Sérum Physiologique", marque: "Gilbert", prix: "", ancienPrix: "", badge: "", image: "images/products/enf-serum-physio.jpg", imagePerso: "", description: "Solution stérile de chlorure de sodium pour le nettoyage du nez et des yeux", bienfaits: ["Désobstrue le nez encombré du bébé", "Nettoie les yeux en douceur", "Solution isotonique non irritante", "Unidoses stériles pratiques et hygiéniques"], utilisation: "Nez : incliner la tête de bébé sur le côté, instiller dans la narine supérieure. Yeux : nettoyer du coin interne vers l'extérieur.", composition: "Chlorure de sodium 0.9%, eau purifiée, unidoses stériles de 5ml" },
    { id: "enf-006", nom: "Oméga-3 Junior", marque: "Doppel Herz", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-006.jpg", imagePerso: "", description: "Complément multi-vitamines avec DHA pour le développement cérébral des enfants", bienfaits: ["Le DHA soutient le développement du cerveau", "11 vitamines essentielles à la croissance", "Renforce l'immunité des enfants", "Capsules à mâcher au bon goût fruité"], utilisation: "1 capsule à mâcher par jour pour les enfants à partir de 4 ans. Goût fruité apprécié des enfants.", composition: "DHA 100mg, Vitamines A, B1, B2, B6, B12, C, D, E, Niacine, Acide folique" },
  ],

  // ─────────────────────────────────────────
  // PRODUITS FEMMES
  // ─────────────────────────────────────────
  femmes: [
    { id: "fem-001", nom: "Test de Grossesse", marque: "Clearblue", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-110.jpg", imagePerso: "", description: "Test de grossesse digital avec résultat clair en mots : Enceinte ou Pas Enceinte", bienfaits: ["Résultat clair en mots, pas de doute possible", "Fiabilité supérieure à 99% dès la date prévue des règles", "Peut détecter jusqu'à 4 jours avant la date des règles", "Facile à utiliser avec résultat en 3 minutes"], utilisation: "Retirer le capuchon, placer la mèche absorbante sous le jet d'urine pendant 5 secondes. Poser à plat et lire après 3 minutes.", composition: "Bandelette réactive aux hormones hCG, affichage digital" },
    { id: "fem-002", nom: "Compléments Grossesse", marque: "Gynéfam", prix: "", ancienPrix: "", badge: "", image: "images/products/fem-grossesse.jpg", imagePerso: "", description: "Compléments vitaminiques essentiels pour la femme enceinte et son bébé", bienfaits: ["L'acide folique prévient les malformations du tube neural", "Le fer prévient l'anémie de grossesse", "Le DHA soutient le développement cérébral du fœtus", "Iode essentiel pour la thyroïde mère et bébé"], utilisation: "1 gélule par jour dès le désir de grossesse et pendant toute la grossesse. Prendre pendant le repas.", composition: "Acide folique 400µg, Fer 14mg, DHA 200mg, Iode 150µg, Vitamines B9, B12, D" },
    { id: "fem-003", nom: "Oxyskin Anti-Tâches", marque: "Oxyskin", prix: "", ancienPrix: "", badge: "NOUVEAU", image: "images/gallery/photo-169.jpg", imagePerso: "", description: "Soin anti-tâches spécialement adapté aux besoins de la peau féminine", bienfaits: ["Réduit les tâches brunes et le masque de grossesse", "Unifie et illumine le teint", "Purifie la peau en profondeur", "Formule douce respectant la peau sensible"], utilisation: "Appliquer matin et soir sur le visage propre. Masser en mouvements circulaires. Protéger du soleil.", composition: "Niacinamide, Vitamine C, Acide Kojique, Arbutine" },
    { id: "fem-004", nom: "Serviettes Hygiéniques", marque: "Always", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-110.jpg", imagePerso: "", description: "Serviettes hygiéniques ultra-fines avec absorption maximale et protection anti-fuites", bienfaits: ["Ultra-fines et discrètes sous les vêtements", "Absorption rapide et haute capacité", "Ailettes protectrices anti-fuites", "Voile supérieur sec au toucher"], utilisation: "Retirer la bande adhésive, placer au centre du sous-vêtement, rabattre les ailettes.", composition: "Cellulose, polymère super-absorbant, voile non-tissé, ailettes adhésives" },
    { id: "fem-005", nom: "Gel Intime", marque: "Saforelle", prix: "", ancienPrix: "", badge: "", image: "images/products/fem-saforelle.jpg", imagePerso: "", description: "Gel de toilette intime doux au pH physiologique pour l'hygiène quotidienne", bienfaits: ["pH adapté à la zone intime (pH 5.5)", "Apaise les irritations et démangeaisons", "Respecte la flore vaginale naturelle", "Convient à l'usage quotidien et pendant la grossesse"], utilisation: "Appliquer une noisette sur la zone intime humidifiée, nettoyer délicatement et rincer. Usage externe uniquement.", composition: "Bardane apaisante, pH physiologique 5.5, sans savon, sans paraben" },
    { id: "fem-006", nom: "Perfectil Femme", marque: "Vitabiotics", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-161.jpg", imagePerso: "", description: "Formule beauté complète spécialement conçue pour la femme : peau, cheveux et ongles", bienfaits: ["Nourrit la peau pour un teint lumineux", "Renforce les cheveux et réduit la chute", "Fortifie les ongles cassants", "Formule enrichie adaptée aux besoins féminins"], utilisation: "1 comprimé par jour après le repas avec de l'eau froide. Cure de 3 mois pour des résultats optimaux.", composition: "Biotine, Sélénium, Zinc, Fer, Vitamine C, E, Collagène marin, Acide hyaluronique" },
  ],

  // ─────────────────────────────────────────
  // PRODUITS DIVERS
  // ─────────────────────────────────────────
  divers: [
    { id: "div-001", nom: "Dietaroma Vinalège", marque: "Dietaroma", prix: "", ancienPrix: "", badge: "", image: "images/products/div-vinalege.jpg", imagePerso: "", description: "Complément à base de vigne rouge pour la circulation veineuse et les jambes légères", bienfaits: ["Soulage la sensation de jambes lourdes", "Améliore la circulation veineuse", "Réduit les gonflements des chevilles", "Renforce la paroi des vaisseaux sanguins"], utilisation: "2 gélules par jour pendant les repas. Cure de 1 à 2 mois, surtout en été.", composition: "Vigne rouge, Hamamélis, Marron d'Inde, Vitamine C" },
    { id: "div-002", nom: "VinoZinc", marque: "VinoZinc", prix: "", ancienPrix: "", badge: "", image: "images/products/div-vinozinc.jpg", imagePerso: "", description: "Zinc et polyphénols de raisin pour la protection cellulaire et l'immunité", bienfaits: ["Le zinc renforce le système immunitaire", "Les polyphénols protègent les cellules", "Améliore la qualité de la peau", "Antioxydant naturel puissant"], utilisation: "1 gélule par jour pendant le repas. Cure de 2 à 3 mois.", composition: "Zinc 15mg, Polyphénols de raisin 100mg, Vitamine C" },
    { id: "div-003", nom: "Ernst Richter's Tisane", marque: "Ernst Richter", prix: "", ancienPrix: "", badge: "", image: "images/products/div-tisane.jpg", imagePerso: "", description: "Tisane minceur traditionnelle pour le transit intestinal et la perte de poids", bienfaits: ["Facilite le transit intestinal", "Aide à la perte de poids naturellement", "Effet détox et drainant", "Plantes médicinales de qualité allemande"], utilisation: "1 sachet le soir dans une tasse d'eau chaude. Laisser infuser 3-5 minutes. Ne pas dépasser 1 tasse par jour. Cure de 2 semaines max.", composition: "Séné, Anis vert, Fenouil, Menthe poivrée" },
    { id: "div-004", nom: "IMC Plus", marque: "IMC Plus", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-008.jpg", imagePerso: "", description: "Complément pour le contrôle du poids et l'équilibre de l'indice de masse corporelle", bienfaits: ["Aide au contrôle du poids corporel", "Favorise le métabolisme des graisses", "Réduit l'appétit naturellement", "Soutient un mode de vie sain"], utilisation: "1 à 2 gélules avant les repas principaux avec un grand verre d'eau. Associer à une activité physique.", composition: "Garcinia Cambogia, Chrome, Thé vert, L-Carnitine" },
    { id: "div-005", nom: "Levumai", marque: "Levumai", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-008.jpg", imagePerso: "", description: "Levure de bière enrichie pour la beauté de la peau, des cheveux et des ongles", bienfaits: ["Source naturelle de vitamines B", "Renforce les cheveux et réduit la chute", "Améliore la qualité de la peau", "Fortifie les ongles cassants"], utilisation: "2 à 3 comprimés par jour pendant les repas. Cure de 2 à 3 mois.", composition: "Levure de bière 500mg, Vitamines B1, B2, B6, B9, PP, Zinc" },
  ],

  // ─────────────────────────────────────────
  // CERAVE — Soins Dermatologiques
  // ─────────────────────────────────────────
  cerave: [
    { id: "cer-001", nom: "CeraVe Crème Hydratante", marque: "CeraVe", gamme: "Hydratants", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-271.jpg", imagePerso: "", description: "Crème hydratante visage et corps pour peaux sèches à très sèches avec 3 céramides essentiels", bienfaits: ["Hydrate intensément pendant 24 heures", "Restaure la barrière cutanée avec 3 céramides", "Texture riche non grasse et non comédogène", "Convient aux peaux sensibles et atopiques"], utilisation: "Appliquer matin et soir sur le visage et le corps. Convient à toute la famille, y compris les nourrissons.", composition: "Céramides 1, 3, 6-II, Acide hyaluronique, Cholestérol, Pétrolatum" },
    { id: "cer-002", nom: "CeraVe Gel Moussant", marque: "CeraVe", gamme: "Nettoyants", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-271.jpg", imagePerso: "", description: "Gel nettoyant moussant pour peaux normales à grasses, élimine l'excès de sébum", bienfaits: ["Nettoie en profondeur sans dessécher", "Élimine l'excès de sébum et les impuretés", "Respecte le pH physiologique de la peau", "Les céramides maintiennent la barrière cutanée"], utilisation: "Matin et soir, faire mousser avec de l'eau tiède, masser le visage puis rincer. Éviter le contour des yeux.", composition: "Céramides 1, 3, 6-II, Niacinamide, Acide hyaluronique" },
    { id: "cer-003", nom: "CeraVe Lait Hydratant", marque: "CeraVe", gamme: "Hydratants", prix: "", ancienPrix: "", badge: "NOUVEAU", image: "images/gallery/photo-271.jpg", imagePerso: "", description: "Lait hydratant léger pour le visage et le corps, absorption rapide", bienfaits: ["Hydratation légère 24h sans effet gras", "Absorption rapide, idéal pour le quotidien", "Restaure et protège la barrière de la peau", "Formule hypoallergénique sans parfum"], utilisation: "Appliquer après la douche sur peau humide pour une meilleure absorption. Matin et soir.", composition: "Céramides 1, 3, 6-II, Acide hyaluronique, MVE Technology" },
    { id: "cer-004", nom: "CeraVe Crème Lavante", marque: "CeraVe", gamme: "Nettoyants", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-271.jpg", imagePerso: "", description: "Crème lavante hydratante pour peaux sèches, nettoyage doux du visage et du corps", bienfaits: ["Nettoyage ultra-doux sans savon", "Hydrate pendant le lavage grâce aux céramides", "Ne perturbe pas la barrière cutanée", "Idéal pour les peaux atopiques et eczéma"], utilisation: "Utiliser comme nettoyant visage et corps sous la douche. Faire mousser et rincer.", composition: "Céramides 1, 3, 6-II, Acide hyaluronique, Glycérine" },
    { id: "cer-005", nom: "CeraVe SA Crème Anti-Rugosités", marque: "CeraVe", gamme: "Exfoliants", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-271.jpg", imagePerso: "", description: "Crème exfoliante à l'acide salicylique pour lisser les rugosités et la peau granuleuse", bienfaits: ["L'acide salicylique exfolie en douceur", "Lisse les rugosités et la kératose pilaire", "L'urée 10% adoucit les zones très sèches", "Les céramides réparent la barrière cutanée"], utilisation: "Appliquer 1 à 2 fois par jour sur les zones rugueuses (bras, jambes, coudes). Utiliser un SPF le jour.", composition: "Acide salicylique 2%, Urée 10%, Céramides 1, 3, 6-II, Niacinamide" },
    { id: "cer-006", nom: "CeraVe Baume Hydratant", marque: "CeraVe", gamme: "Hydratants", prix: "", ancienPrix: "", badge: "", image: "images/gallery/photo-271.jpg", imagePerso: "", description: "Baume ultra-riche pour peaux très sèches, irritées ou à tendance atopique", bienfaits: ["Hydratation intense longue durée", "Soulage les démangeaisons et irritations", "Texture baume onctueuse non collante", "Convient aux peaux atopiques et eczéma"], utilisation: "Appliquer généreusement sur les zones très sèches, 1 à 2 fois par jour.", composition: "Céramides 1, 3, 6-II, Acide hyaluronique, Pétrolatum, MVE Technology" },
  ]
};

// ─────────────────────────────────────────
// MARQUES & GAMMES
// ─────────────────────────────────────────
const GAMMES = [
  { id: "gam-mgdbio", nom: "MGD Bio", logo: "images/gallery/photo-003.jpg", description: "Gamme bio phytothérapie — chardon marie, maca, curcuma, fenugrec et plus", marques: ["MGD Bio"], icon: "fas fa-leaf" },
  { id: "gam-mgd", nom: "MGD Classique", logo: "images/gallery/photo-004.jpg", description: "Compléments naturels — collagène, propolis, pépins de courge, oméga 3", marques: ["MGD"], icon: "fas fa-capsules" },
  { id: "gam-doppel", nom: "Doppel Herz Aktiv", logo: "images/gallery/photo-005.jpg", description: "Compléments alimentaires allemands premium — vitamines, oméga 3, probiotiques", marques: ["Doppel Herz"], icon: "fas fa-heart" },
  { id: "gam-vertu", nom: "Vertu Plus", logo: "images/gallery/photo-001.jpg", description: "Vitamines et minéraux essentiels — B12, fer, magnésium, curcuma", marques: ["Vertu Plus", "Vertu"], icon: "fas fa-pills" },
  { id: "gam-nutrilab", nom: "NutriLab", logo: "images/gallery/photo-194.jpg", description: "Superaliments bio — spiruline, ashwagandha, magnésium, oméga 3", marques: ["NutriLab"], icon: "fas fa-seedling" },
  { id: "gam-indoka", nom: "Indoka & Packs", logo: "images/gallery/photo-009.jpg", description: "Packs vitalité, beauté et compléments — vitamine D3+K2", marques: ["Indoka", "Indoka (Newos)"], icon: "fas fa-box-open" },
  { id: "gam-beaute", nom: "Soins Beauté & Peau", logo: "images/gallery/photo-275.jpg", description: "Anti-tâches, éclaircissants, collagène — Oxyskin, Phor Max, Glutalia, Gleamy", marques: ["Oxyskin Beauty Formula", "Oxyskin", "Phor Max", "Glutalia", "SDM Boost", "SDM", "Gleamy", "Urania", "Viticap", "Great Forma"], icon: "fas fa-spa" },
  { id: "gam-appareils", nom: "Appareils Médicaux", logo: "images/gallery/photo-002.jpg", description: "Tensiomètres, glucomètres, thermomètres, oxymètres — Omron, Accu-Chek, Acare", marques: ["Omron", "Microlife", "Roche", "On Call", "Acare", "Nohero", "Darcare"], icon: "fas fa-heartbeat" },
  { id: "gam-ortho", nom: "Orthopédie & Maintien", logo: "images/gallery/photo-050.jpg", description: "Genouillères, ceintures lombaires, semelles, chevillères, colliers cervicaux", marques: ["Thuasne", "Gibaud", "Scholl", "Medisport"], icon: "fas fa-bone" },
  { id: "gam-bebe", nom: "Bébé & Enfants", logo: "images/gallery/photo-150.jpg", description: "Lait infantile, couches, crèmes change, sérum physiologique", marques: ["Gallia", "Blédina", "Pampers", "Mustela", "Gilbert"], icon: "fas fa-baby" },
  { id: "gam-femmes", nom: "Femmes & Maternité", logo: "images/gallery/photo-110.jpg", description: "Tests grossesse, compléments maternité, hygiène intime, beauté", marques: ["Clearblue", "Gynéfam", "Always", "Saforelle", "Vitabiotics"], icon: "fas fa-female" },
  { id: "gam-cerave", nom: "CeraVe", logo: "images/gallery/photo-271.jpg", description: "Soins dermatologiques — nettoyants, hydratants, exfoliants aux 3 céramides essentiels", marques: ["CeraVe"], icon: "fas fa-pump-medical" },
  { id: "gam-divers", nom: "Bien-être & Divers", logo: "images/gallery/photo-170.jpg", description: "Tisanes, circulation, levure de bière, contrôle du poids", marques: ["Dietaroma", "VinoZinc", "Ernst Richter", "IMC Plus", "Levumai", "Extralevure", "Diafit", "Sakai", "Spirit Pharma", "Shilajit", "New Carti"], icon: "fas fa-star" },
];

// ─────────────────────────────────────────
// OFFRES SPÉCIALES
// ─────────────────────────────────────────
const OFFRES = [
  {
    id: "off-001",
    titre: "Pack Bio Vitalité Indoka",
    description: "Découvrez notre pack complet vitalité — compléments + vitamines à prix réduit",
    image: "images/gallery/photo-009.jpg",
    dateDebut: "",
    dateFin: "",
    actif: true
  },
  {
    id: "off-002",
    titre: "Gamme MGD Bio",
    description: "Toute la gamme phytothérapie bio MGD disponible — plus de 15 références",
    image: "images/gallery/photo-003.jpg",
    dateDebut: "",
    dateFin: "",
    actif: true
  },
  {
    id: "off-003",
    titre: "Appareils de Mesure",
    description: "Tensiomètres Omron, glucomètres Accu-Chek — contrôlez votre santé à domicile",
    image: "images/gallery/photo-002.jpg",
    dateDebut: "",
    dateFin: "",
    actif: true
  },
];

// INFOS PHARMACIE (modifiables)
const PHARMACIE_INFO = {
  nom: "PHARMACIE RHAZLAOUI",
  sousNom: "LA PARA RHAZLAOUI",
  adresse: "Avenue Abderrahim Bouabid N°1066, Hay Fath, Khouribga 25000",
  telephone: "0701065553",
  whatsapp: "212701065553",
  email: "",
  instagram: "https://www.instagram.com/",
  tiktok: "https://www.tiktok.com/",
  horaires: {
    lundi_vendredi_matin: "09h00 – 12h30",
    lundi_vendredi_soir: "15h30 – 20h00",
    samedi: "09h00 – 13h00",
    garde: "Pharmacie de garde disponible"
  }
};
