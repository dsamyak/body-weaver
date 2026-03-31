export interface SubPartData {
  name: string;
  description: string;
}

export interface BodyPartData {
  id: string;
  name: string;
  system: string;
  description: string;
  theory: string;
  position: [number, number, number];
  scale: [number, number, number];
  shape: 'sphere' | 'cylinder' | 'box' | 'capsule';
  color: string;
  details: string[];
  modelPath?: string;
  subParts?: SubPartData[];
}

export const bodyPartsData: BodyPartData[] = [
  // Head & Neck
  {
    id: 'skull',
    name: 'Skull (Cranium)',
    system: 'Skeletal',
    description: 'The bony structure that forms the head, protecting the brain and supporting the face.',
    theory: 'The skull, or cranium, is composed of 22 individual bones joined together by immovable joints called sutures. It serves primarily to protect the brain (neurocranium) and support the structures of the face (viscerocranium). The base of the skull contains the foramen magnum, allowing the spinal cord to connect to the brainstem. Bone tissue in the skull is constantly remodeling to maintain structural integrity and mineral balance.',
    position: [0, 3.6, 0],
    scale: [0.55, 0.65, 0.6],
    shape: 'sphere',
    color: '#00b8ff',
    details: ['Contains 22 bones', 'Protects the brain', 'Houses sensory organs', 'Weight: ~1 kg'],
    subParts: [
      { name: 'Cranial Vault', description: 'The upper part forming the enclosure for the brain.' },
      { name: 'Facial Skeleton', description: 'Forms the highly complex structure of the face.' },
      { name: 'Mandible', description: 'The lower jawbone, the only movable bone of the skull.' }
    ]
  },
  {
    id: 'brain',
    name: 'Brain',
    system: 'Nervous',
    description: 'The central organ of the nervous system, controlling thought, memory, emotion, and motor skills.',
    theory: 'The human brain is a highly complex organ comprising billions of neurons and glial cells. It coordinates both conscious actions and involuntary vital functions like heart rate and respiration via the autonomic nervous system. The cerebral cortex processes sensory integration, thought, and language, while deeper structures like the basal ganglia and limbic system manage movement and emotion. The brain consumes approximately 20% of the body\'s energy despite accounting for only 2% of total body weight, relying on a continuous supply of glucose and oxygen.',
    position: [0, 3.7, 0],
    scale: [0.42, 0.48, 0.45],
    shape: 'sphere',
    color: '#cc44ff',
    details: ['~86 billion neurons', 'Weighs ~1.4 kg', 'Uses 20% of body oxygen', '3 main parts: cerebrum, cerebellum, brainstem'],
    subParts: [
      { name: 'Cerebrum', description: 'Handles conscious thought, language, and voluntary movement.' },
      { name: 'Cerebellum', description: 'Coordinates fine muscle movement, balance, and posture.' },
      { name: 'Brainstem', description: 'Controls automatic functions like breathing, heart rate, and blood pressure.' },
      { name: 'Diencephalon', description: 'Contains the thalamus and hypothalamus; relays sensory info and controls homeostasis.' }
    ]
  },
  {
    id: 'eyes',
    name: 'Eyes',
    system: 'Sensory',
    description: 'The organs of sight, detecting light and converting it to electrochemical impulses.',
    theory: 'The eyes are specialized sensory organs that capture light through the cornea, refracting it through the crystalline lens to hit the retina. The retina contains millions of photoreceptor cells—rods for low-light vision and cones for color detection. These cells translate light photons into electrochemical signals that travel via the optic nerve to the visual cortex in the occipital lobe, where images are constructed.',
    position: [0, 3.65, 0.35],
    scale: [0.45, 0.12, 0.12],
    shape: 'box',
    color: '#ffffff',
    details: ['~576 megapixels equivalent', '6 extraocular muscles each', 'Can distinguish ~10M colors', 'Blinks ~15-20 times/min'],
    subParts: [
      { name: 'Cornea', description: 'The clear front surface that focuses light entering the eye.' },
      { name: 'Lens', description: 'Focuses light precisely onto the retina.' },
      { name: 'Retina', description: 'The light-sensitive inner lining containing photoreceptors (rods and cones).' },
      { name: 'Optic Nerve', description: 'Transmits visual information from the retina to the brain.' }
    ]
  },
  {
    id: 'neck',
    name: 'Neck (Cervical Spine)',
    system: 'Skeletal',
    description: 'The region connecting the head to the torso, housing the cervical vertebrae and vital structures.',
    theory: 'The neck is framed structurally by seven cervical vertebrae (C1-C7) which provide flexibility and wide range of motion for the head. Functionally, it serves as the critical transit point for major vascular structures, such as the carotid arteries bringing oxygenated blood to the brain, and the jugular veins returning deoxygenated blood. It also houses the thyroid gland, trachea (respiratory system), and esophagus (digestive system).',
    position: [0, 3.0, 0],
    scale: [0.18, 0.3, 0.18],
    shape: 'cylinder',
    color: '#00b8ff',
    details: ['7 cervical vertebrae', 'Contains carotid arteries', 'Houses the trachea & esophagus', 'Supports ~5 kg head'],
    subParts: [
      { name: 'Cervical Vertebrae', description: 'The 7 bones providing structural support for the neck.' },
      { name: 'Trachea', description: 'The windpipe connecting the larynx to the bronchi.' },
      { name: 'Esophagus', description: 'The muscular tube connecting the throat with the stomach.' },
      { name: 'Thyroid Gland', description: 'Endocrine gland that regulates metabolism.' }
    ]
  },

  // Torso
  {
    id: 'ribcage',
    name: 'Rib Cage',
    system: 'Skeletal',
    description: 'A bony and cartilaginous structure surrounding the thoracic cavity, protecting vital organs.',
    theory: 'The rib cage consists of 12 pairs of ribs attaching to the thoracic vertebrae posteriorly and the sternum anteriorly. It provides a protective enclosure for the cardiopulmonary organs. By expanding and contracting under the mechanical action of the intercostal muscles and diaphragm, the rib cage enables the negative-pressure breathing mechanics required to draw air into the lungs.',
    position: [0, 2.2, 0],
    scale: [0.7, 0.8, 0.4],
    shape: 'box',
    color: '#0088cc',
    details: ['12 pairs of ribs', 'Protects heart & lungs', 'Aids in breathing', 'Connected to thoracic vertebrae'],
    subParts: [
      { name: 'Sternum', description: 'The flat bone at the center of the chest (breastbone).' },
      { name: 'True Ribs', description: 'First 7 pairs, attached directly to the sternum.' },
      { name: 'False & Floating Ribs', description: 'Lower 5 pairs, attaching indirectly or not at all to the sternum.' }
    ]
  },
  {
    id: 'heart',
    name: 'Heart',
    system: 'Cardiovascular',
    description: 'A muscular organ that pumps blood throughout the body via the circulatory system.',
    theory: 'The heart is a four-chambered muscular pump comprised largely of specialized cardiac muscle (myocardium) which doesn\'t fatigue. The right side pumps deoxygenated blood to the lungs for gas exchange (pulmonary circulation), while the left side propels oxygen-rich blood through the aorta to the rest of the body (systemic circulation). Its intrinsic electrical conduction system autonomously sets the rhythm.',
    position: [-0.15, 2.3, 0.1],
    scale: [0.22, 0.25, 0.2],
    shape: 'sphere',
    color: '#ff1155',
    details: ['Beats ~100,000 times/day', '4 chambers', 'Pumps ~5L blood/min', 'Weight: ~300g'],
    subParts: [
      { name: 'Atria', description: 'The two upper receiving chambers for blood.' },
      { name: 'Ventricles', description: 'The two lower discharging chambers that pump blood out.' },
      { name: 'Heart Valves', description: 'Prevent the backward flow of blood.' },
      { name: 'Aorta', description: 'The main artery carrying oxygenated blood away from the heart.' }
    ]
  },
  {
    id: 'lungs',
    name: 'Lungs',
    system: 'Respiratory',
    description: 'The primary organs of respiration, responsible for gas exchange between air and blood.',
    theory: 'The lungs are highly elastic organs that conduct gas exchange across the delicate respiratory membrane of millions of tiny air sacs known as alveoli. Oxygen is bound to hemoglobin in the pulmonary capillaries, while carbon dioxide diffuses out to be exhaled. Surfactant produced by Type II alveolar cells lowers surface tension, preventing lung collapse during exhalation.',
    position: [0, 2.3, 0],
    scale: [0.65, 0.6, 0.35],
    shape: 'box',
    color: '#00ffcc',
    details: ['~300 million alveoli', 'Surface area: ~70 m²', 'Right lung has 3 lobes', 'Left lung has 2 lobes'],
    subParts: [
      { name: 'Trachea & Bronchi', description: 'The airways leading down into the lungs.' },
      { name: 'Alveoli', description: 'Microscopic air sacs where gas exchange occurs.' },
      { name: 'Pleura', description: 'The membranes enclosing the lungs.' }
    ]
  },
  {
    id: 'spine',
    name: 'Spinal Column',
    system: 'Skeletal',
    description: 'The vertebral column providing structural support and protecting the spinal cord.',
    theory: 'The spinal column is comprised of 33 vertebrae categorized into cervical, thoracic, lumbar, sacral, and coccygeal regions. Intervertebral discs composed of annulus fibrosus and a gel-like nucleus pulposus act as shock absorbers. Crucially, the spine encloses the spinal cord, serving as the central highway for nerve signals traveling between the brain and the peripheral nervous system.',
    position: [0, 1.8, -0.2],
    scale: [0.12, 1.8, 0.12],
    shape: 'cylinder',
    color: '#0088cc',
    details: ['33 vertebrae', '4 natural curves', 'Protects spinal cord', 'Allows flexibility & movement'],
    subParts: [
      { name: 'Cervical Region', description: 'The neck region (C1-C7).' },
      { name: 'Thoracic Region', description: 'The mid-back region articulating with the ribs (T1-T12).' },
      { name: 'Lumbar Region', description: 'The lower back region supporting upper body weight (L1-L5).' },
      { name: 'Sacrum & Coccyx', description: 'The fused lower regions connecting to the pelvis.' }
    ]
  },
  {
    id: 'stomach',
    name: 'Stomach',
    system: 'Digestive',
    description: 'A muscular organ that receives food from the esophagus and begins chemical digestion.',
    theory: 'The stomach mechanically churns food while secreting gastric juices populated by hydrochloric acid and the enzyme pepsin. This highly acidic environment (pH 1.5 - 3.5) sterilizes ingested food and begins breaking down complex proteins. To prevent self-digestion, the stomach mucosa continually produces a thick, alkaline mucous layer that neutralizes acid upon contact.',
    position: [0.15, 1.6, 0.1],
    scale: [0.3, 0.25, 0.22],
    shape: 'sphere',
    color: '#ff8800',
    details: ['Capacity: ~1 liter', 'pH of gastric acid: 1.5-3.5', 'Churns food 3x/min', 'Lined with mucus membrane'],
    subParts: [
      { name: 'Cardia', description: 'Where food enters from the esophagus.' },
      { name: 'Fundus', description: 'The upper rounded part, storing undigested food and gases.' },
      { name: 'Body (Corpus)', description: 'The main, central region for churning and mixing.' },
      { name: 'Pylorus', description: 'The valve that connects the stomach to the small intestine.' }
    ]
  },
  {
    id: 'liver',
    name: 'Liver',
    system: 'Digestive',
    description: 'The largest internal organ, performing over 500 vital functions including detoxification.',
    theory: 'The liver fundamentally maintains metabolic homeostasis. It filters blood incoming from the digestive tract via the portal vein, detoxifying harmful substances, synthesizing vital blood proteins (like albumin and clotting factors), and managing glucose storage (converting glucose into glycogen). Additionally, the liver secretes bile into the gallbladder to aid in the digestion and absorption of dietary fats in the small intestine.',
    position: [-0.25, 1.7, 0.1],
    scale: [0.35, 0.2, 0.22],
    shape: 'box',
    color: '#ffcc00',
    details: ['Weighs ~1.5 kg', '500+ functions', 'Produces bile', 'Can regenerate itself'],
    subParts: [
      { name: 'Right Lobe', description: 'The largest lobe of the liver.' },
      { name: 'Left Lobe', description: 'Smaller and flatter than the right lobe.' },
      { name: 'Gallbladder', description: 'Sits under the liver; stores and concentrates bile.' },
      { name: 'Hepatic Portal Vein', description: 'Carries nutrient-rich blood from the digestive tract to the liver.' }
    ]
  },
  {
    id: 'kidneys',
    name: 'Kidneys',
    system: 'Urinary',
    description: 'Bean-shaped organs that filter blood, removing waste and excess fluid to form urine.',
    theory: 'The kidneys filter approximately 180 liters of blood plasma daily through intricate structures known as nephrons. They meticulously balance electrolyte levels, manage body fluid osmolarity, and eliminate water-soluble metabolic waste like urea. The kidneys also play endocrine roles by modulating blood pressure via the renin-angiotensin loop and secreting erythropoietin to stimulate red blood cell production.',
    position: [0, 1.4, -0.15],
    scale: [0.55, 0.18, 0.15],
    shape: 'box',
    color: '#ff4400',
    details: ['Filter ~180L blood/day', '~1 million nephrons each', 'Produce 1-2L urine/day', 'Regulate blood pressure'],
    subParts: [
      { name: 'Renal Cortex', description: 'The outer region containing millions of filtering nephrons.' },
      { name: 'Renal Medulla', description: 'The inner region containing the renal pyramids.' },
      { name: 'Renal Pelvis', description: 'The funnel-like dilated part of the ureter in the kidney.' },
      { name: 'Ureters', description: 'Tubes carrying urine from the kidneys to the bladder.' }
    ]
  },
  {
    id: 'intestines',
    name: 'Intestines',
    system: 'Digestive',
    description: 'The long, continuous tube where most digestion and nutrient absorption occurs.',
    theory: 'The intestines are divided into two main sections: small and large. The small intestine (composed of duodenum, jejunum, ileum) utilizes enzymes and bile to fully digest food, heavily relying on heavily folded microvilli to maximize nutrient absorption into the bloodstream. The large intestine (colon) reabsorbs water and electrolytes while compacting indigestible waste, acting in symbiosis with trillions of diverse gut microbiomes.',
    position: [0, 1.1, 0.05],
    scale: [0.5, 0.4, 0.3],
    shape: 'box',
    color: '#ffaa33',
    details: ['Small intestine: ~6m long', 'Large intestine: ~1.5m', 'Surface area: ~32 m²', '~100 trillion gut bacteria'],
    subParts: [
      { name: 'Duodenum', description: 'The first part of the small intestine; receives bile and pancreatic juice.' },
      { name: 'Jejunum & Ileum', description: 'The remaining sections of the small intestine where most absorption occurs.' },
      { name: 'Colon', description: 'The main part of the large intestine; extracts water and salt.' },
      { name: 'Rectum', description: 'The final section of the large intestine, terminating at the anus.' }
    ]
  },
  {
    id: 'pelvis',
    name: 'Pelvis',
    system: 'Skeletal',
    description: 'The bony structure at the base of the spine, supporting the weight of the upper body.',
    theory: 'The pelvic girdle connects the axial skeleton to the lower limbs, transmitting mechanical forces vertically out to the femurs. Structurally composed of fused bones (ilium, ischium, and pubis), it serves a dual purpose: stabilizing upper body weight distribution to the legs and shielding extremely sensitive reproductive and lower abdominal organs.',
    position: [0, 0.7, 0],
    scale: [0.6, 0.35, 0.35],
    shape: 'box',
    color: '#0088cc',
    details: ['3 fused bones per side', 'Supports body weight', 'Protects reproductive organs', 'Differs between sexes'],
    subParts: [
      { name: 'Ilium', description: 'The largest and uppermost pelvic bone.' },
      { name: 'Ischium', description: 'The lower, back part of the pelvic bone.' },
      { name: 'Pubis', description: 'The forward portion of the pelvic bone.' }
    ]
  },

  // Arms
  {
    id: 'right-shoulder',
    name: 'Right Shoulder',
    system: 'Skeletal/Muscular',
    description: 'The most mobile joint in the body, connecting the arm to the torso.',
    theory: 'The shoulder joint (glenohumeral joint) provides immense degrees of freedom at the expense of inherent stability. To manage this instability, it relies on the rotator cuff—four coordinated muscles (supraspinatus, infraspinatus, teres minor, subscapularis) that firmly anchor the head of the humerus into the shallow glenoid cavity of the scapula.',
    position: [-0.65, 2.7, 0],
    scale: [0.2, 0.2, 0.2],
    shape: 'sphere',
    color: '#00b8ff',
    details: ['Ball-and-socket joint', '4 rotator cuff muscles', '360° range of motion', 'Most commonly dislocated joint'],
    subParts: [
      { name: 'Clavicle', description: 'The collarbone, acting as a strut.' },
      { name: 'Scapula', description: 'The shoulder blade, connecting the humerus with the clavicle.' },
      { name: 'Rotator Cuff', description: 'Group of muscles and their tendons acting to stabilize the shoulder.' }
    ]
  },
  {
    id: 'left-shoulder',
    name: 'Left Shoulder',
    system: 'Skeletal/Muscular',
    description: 'The most mobile joint in the body, connecting the arm to the torso.',
    theory: 'The shoulder joint (glenohumeral joint) provides immense degrees of freedom at the expense of inherent stability. To manage this instability, it relies on the rotator cuff—four coordinated muscles (supraspinatus, infraspinatus, teres minor, subscapularis) that firmly anchor the head of the humerus into the shallow glenoid cavity of the scapula.',
    position: [0.65, 2.7, 0],
    scale: [0.2, 0.2, 0.2],
    shape: 'sphere',
    color: '#00b8ff',
    details: ['Ball-and-socket joint', '4 rotator cuff muscles', '360° range of motion', 'Most commonly dislocated joint'],
    subParts: [
      { name: 'Clavicle', description: 'The collarbone, acting as a strut.' },
      { name: 'Scapula', description: 'The shoulder blade, connecting the humerus with the clavicle.' },
      { name: 'Rotator Cuff', description: 'Group of muscles and their tendons acting to stabilize the shoulder.' }
    ]
  },
  {
    id: 'right-upper-arm',
    name: 'Right Upper Arm (Humerus)',
    system: 'Skeletal/Muscular',
    description: 'The region between shoulder and elbow, containing the humerus bone and major muscles.',
    theory: 'The upper arm revolves anatomically around the humerus bone, encasing vital neurovascular bundles that run towards the hand. Muscularly, it is distinguished into two compartments; the anterior compartment houses the powerful biceps brachii serving as flexors, while the posterior compartment carries the triceps brachii responsible for forceful arm extension.',
    position: [-0.75, 2.2, 0],
    scale: [0.12, 0.5, 0.12],
    shape: 'cylinder',
    color: '#00b8ff',
    details: ['Contains humerus bone', 'Biceps & triceps muscles', 'Brachial artery', 'Major nerve pathways'],
    subParts: [
      { name: 'Humerus', description: 'The long bone in the upper arm.' },
      { name: 'Biceps Brachii', description: 'Muscle on the front of the upper arm, primarily for flexing the elbow.' },
      { name: 'Triceps Brachii', description: 'Muscle on the back of the upper arm, primarily for extending the elbow.' }
    ]
  },
  {
    id: 'left-upper-arm',
    name: 'Left Upper Arm (Humerus)',
    system: 'Skeletal/Muscular',
    description: 'The region between shoulder and elbow, containing the humerus bone and major muscles.',
    theory: 'The upper arm revolves anatomically around the humerus bone, encasing vital neurovascular bundles that run towards the hand. Muscularly, it is distinguished into two compartments; the anterior compartment houses the powerful biceps brachii serving as flexors, while the posterior compartment carries the triceps brachii responsible for forceful arm extension.',
    position: [0.75, 2.2, 0],
    scale: [0.12, 0.5, 0.12],
    shape: 'cylinder',
    color: '#00b8ff',
    details: ['Contains humerus bone', 'Biceps & triceps muscles', 'Brachial artery', 'Major nerve pathways'],
    subParts: [
      { name: 'Humerus', description: 'The long bone in the upper arm.' },
      { name: 'Biceps Brachii', description: 'Muscle on the front of the upper arm, primarily for flexing the elbow.' },
      { name: 'Triceps Brachii', description: 'Muscle on the back of the upper arm, primarily for extending the elbow.' }
    ]
  },
  {
    id: 'right-forearm',
    name: 'Right Forearm (Radius & Ulna)',
    system: 'Skeletal/Muscular',
    description: 'The region between elbow and wrist, containing two bones and numerous muscles.',
    theory: 'The mechanical complexity of the human forearm stems from its twin structural bones: the radius and the ulna. These bones pivot intricately around one another to facilitate wrist supination (palm-up) and pronation (palm-down). Furthermore, the forearm carries thick bands of flexor and extensor muscles operating the extremely intricate tendons that puppeteer the wrist, digits, and hand mechanisms.',
    position: [-0.8, 1.55, 0],
    scale: [0.1, 0.45, 0.1],
    shape: 'cylinder',
    color: '#00b8ff',
    details: ['Radius & ulna bones', 'Allows pronation/supination', '20+ muscles', 'Contains radial artery'],
    subParts: [
      { name: 'Radius', description: 'The bone on the thumb side of the forearm.' },
      { name: 'Ulna', description: 'The bone on the pinky finger side of the forearm.' },
      { name: 'Flexors & Extensors', description: 'Muscle groups managing hand and wrist articulation.' }
    ]
  },
  {
    id: 'left-forearm',
    name: 'Left Forearm (Radius & Ulna)',
    system: 'Skeletal/Muscular',
    description: 'The region between elbow and wrist, containing two bones and numerous muscles.',
    theory: 'The mechanical complexity of the human forearm stems from its twin structural bones: the radius and the ulna. These bones pivot intricately around one another to facilitate wrist supination (palm-up) and pronation (palm-down). Furthermore, the forearm carries thick bands of flexor and extensor muscles operating the extremely intricate tendons that puppeteer the wrist, digits, and hand mechanisms.',
    position: [0.8, 1.55, 0],
    scale: [0.1, 0.45, 0.1],
    shape: 'cylinder',
    color: '#00b8ff',
    details: ['Radius & ulna bones', 'Allows pronation/supination', '20+ muscles', 'Contains radial artery'],
    subParts: [
      { name: 'Radius', description: 'The bone on the thumb side of the forearm.' },
      { name: 'Ulna', description: 'The bone on the pinky finger side of the forearm.' },
      { name: 'Flexors & Extensors', description: 'Muscle groups managing hand and wrist articulation.' }
    ]
  },
  {
    id: 'right-hand',
    name: 'Right Hand',
    system: 'Skeletal/Muscular',
    description: 'A complex structure of 27 bones enabling fine motor skills and grip.',
    theory: 'The human hand represents an evolutionary marvel of highly defined sensory capabilities coupled with robust mechanical articulation. Each hand includes 27 delicately arranged bones controlled by intrinsic muscles providing minute dexterity, alongside powerful extrinsic tendons originating from the forearm granting formidable grasping power. It serves as our primary tactile interface with the world.',
    position: [-0.85, 1.05, 0],
    scale: [0.12, 0.18, 0.06],
    shape: 'box',
    color: '#00b8ff',
    details: ['27 bones', '34 muscles', '~17,000 touch receptors', 'Most dexterous body part'],
    subParts: [
      { name: 'Carpals', description: 'The 8 wrist bones.' },
      { name: 'Metacarpals', description: 'The 5 bones of the mid-hand.' },
      { name: 'Phalanges', description: 'The 14 bones making up the fingers and thumb.' }
    ]
  },
  {
    id: 'left-hand',
    name: 'Left Hand',
    system: 'Skeletal/Muscular',
    description: 'A complex structure of 27 bones enabling fine motor skills and grip.',
    theory: 'The human hand represents an evolutionary marvel of highly defined sensory capabilities coupled with robust mechanical articulation. Each hand includes 27 delicately arranged bones controlled by intrinsic muscles providing minute dexterity, alongside powerful extrinsic tendons originating from the forearm granting formidable grasping power. It serves as our primary tactile interface with the world.',
    position: [0.85, 1.05, 0],
    scale: [0.12, 0.18, 0.06],
    shape: 'box',
    color: '#00b8ff',
    details: ['27 bones', '34 muscles', '~17,000 touch receptors', 'Most dexterous body part'],
    subParts: [
      { name: 'Carpals', description: 'The 8 wrist bones.' },
      { name: 'Metacarpals', description: 'The 5 bones of the mid-hand.' },
      { name: 'Phalanges', description: 'The 14 bones making up the fingers and thumb.' }
    ]
  },

  // Legs
  {
    id: 'right-thigh',
    name: 'Right Thigh (Femur)',
    system: 'Skeletal/Muscular',
    description: 'The upper leg containing the femur, the longest and strongest bone in the body.',
    theory: 'Anchoring the lower extremity, the femur stands as the longest, heaviest, and strongest osseous structure inside the body, capable of enduring immense bio-mechanical stresses across multiple axes. Functionally, it serves as the central anchor pole for heavily developed muscle groups including the quadriceps femoris for leg extension and hamstrings facilitating locomotion and stability.',
    position: [-0.22, 0.15, 0],
    scale: [0.15, 0.55, 0.15],
    shape: 'cylinder',
    color: '#00b8ff',
    details: ['Femur: longest bone', 'Quadriceps & hamstrings', 'Femoral artery', 'Supports body weight'],
    subParts: [
      { name: 'Femur', description: 'The thigh bone, the longest and strongest in the body.' },
      { name: 'Quadriceps', description: 'Group of 4 muscles on the front of the thigh.' },
      { name: 'Hamstrings', description: 'Group of 3 muscles on the back of the thigh.' }
    ]
  },
  {
    id: 'left-thigh',
    name: 'Left Thigh (Femur)',
    system: 'Skeletal/Muscular',
    description: 'The upper leg containing the femur, the longest and strongest bone in the body.',
    theory: 'Anchoring the lower extremity, the femur stands as the longest, heaviest, and strongest osseous structure inside the body, capable of enduring immense bio-mechanical stresses across multiple axes. Functionally, it serves as the central anchor pole for heavily developed muscle groups including the quadriceps femoris for leg extension and hamstrings facilitating locomotion and stability.',
    position: [0.22, 0.15, 0],
    scale: [0.15, 0.55, 0.15],
    shape: 'cylinder',
    color: '#00b8ff',
    details: ['Femur: longest bone', 'Quadriceps & hamstrings', 'Femoral artery', 'Supports body weight'],
    subParts: [
      { name: 'Femur', description: 'The thigh bone, the longest and strongest in the body.' },
      { name: 'Quadriceps', description: 'Group of 4 muscles on the front of the thigh.' },
      { name: 'Hamstrings', description: 'Group of 3 muscles on the back of the thigh.' }
    ]
  },
  {
    id: 'right-knee',
    name: 'Right Knee',
    system: 'Skeletal/Muscular',
    description: 'The largest joint in the body, connecting the thigh to the lower leg.',
    theory: 'The knee functions primarily as a structurally robust hinge joint governed by multiple interlinked soft tissues. It features menisci—specialized fibrocartilaginous pads designed to absorb shocking compressive loads—and four tough ligamentous tethers (including the ACL and PCL) preventing detrimental pivoting/shearing forces between the femur and tibia during dynamic motion.',
    position: [-0.22, -0.4, 0.05],
    scale: [0.16, 0.14, 0.16],
    shape: 'sphere',
    color: '#0088cc',
    details: ['Largest joint', 'Contains patella (kneecap)', '4 major ligaments', 'Meniscus for cushioning'],
    subParts: [
      { name: 'Patella', description: 'The kneecap, a thick, circular-triangular bone.' },
      { name: 'Meniscus', description: 'C-shaped pieces of tough, rubbery cartilage acting as shock absorbers.' },
      { name: 'Cruciate Ligaments (ACL/PCL)', description: 'Cross inside the knee joint, controlling back-and-forth motion.' }
    ]
  },
  {
    id: 'left-knee',
    name: 'Left Knee',
    system: 'Skeletal/Muscular',
    description: 'The largest joint in the body, connecting the thigh to the lower leg.',
    theory: 'The knee functions primarily as a structurally robust hinge joint governed by multiple interlinked soft tissues. It features menisci—specialized fibrocartilaginous pads designed to absorb shocking compressive loads—and four tough ligamentous tethers (including the ACL and PCL) preventing detrimental pivoting/shearing forces between the femur and tibia during dynamic motion.',
    position: [0.22, -0.4, 0.05],
    scale: [0.16, 0.14, 0.16],
    shape: 'sphere',
    color: '#0088cc',
    details: ['Largest joint', 'Contains patella (kneecap)', '4 major ligaments', 'Meniscus for cushioning'],
    subParts: [
      { name: 'Patella', description: 'The kneecap, a thick, circular-triangular bone.' },
      { name: 'Meniscus', description: 'C-shaped pieces of tough, rubbery cartilage acting as shock absorbers.' },
      { name: 'Cruciate Ligaments (ACL/PCL)', description: 'Cross inside the knee joint, controlling back-and-forth motion.' }
    ]
  },
  {
    id: 'right-lower-leg',
    name: 'Right Lower Leg (Tibia & Fibula)',
    system: 'Skeletal/Muscular',
    description: 'The region between knee and ankle, containing two bones and the calf muscles.',
    theory: 'Below the knee, the thicker anterior tibia bears the vast majority of human body weight while transmitting locomotor forces straight down to the ankle. Concurrently, the slender lateral fibula serves mainly as a rigid strut to provide stabilizing muscle attachments—notably anchoring the powerful triceps surae (calf muscles) that propel the foot forward using the thick Achilles tendon.',
    position: [-0.22, -1.05, 0],
    scale: [0.12, 0.55, 0.12],
    shape: 'cylinder',
    color: '#00b8ff',
    details: ['Tibia & fibula bones', 'Calf muscles (gastrocnemius)', 'Achilles tendon', 'Bears full body weight'],
    subParts: [
      { name: 'Tibia', description: 'The shinbone, larger and stronger, bears most of the weight.' },
      { name: 'Fibula', description: 'The calf bone, smaller, located on the outer side.' },
      { name: 'Gastrocnemius & Soleus', description: 'The major calf muscles that connect to the Achilles tendon.' }
    ]
  },
  {
    id: 'left-lower-leg',
    name: 'Left Lower Leg (Tibia & Fibula)',
    system: 'Skeletal/Muscular',
    description: 'The region between knee and ankle, containing two bones and the calf muscles.',
    theory: 'Below the knee, the thicker anterior tibia bears the vast majority of human body weight while transmitting locomotor forces straight down to the ankle. Concurrently, the slender lateral fibula serves mainly as a rigid strut to provide stabilizing muscle attachments—notably anchoring the powerful triceps surae (calf muscles) that propel the foot forward using the thick Achilles tendon.',
    position: [0.22, -1.05, 0],
    scale: [0.12, 0.55, 0.12],
    shape: 'cylinder',
    color: '#00b8ff',
    details: ['Tibia & fibula bones', 'Calf muscles (gastrocnemius)', 'Achilles tendon', 'Bears full body weight'],
    subParts: [
      { name: 'Tibia', description: 'The shinbone, larger and stronger, bears most of the weight.' },
      { name: 'Fibula', description: 'The calf bone, smaller, located on the outer side.' },
      { name: 'Gastrocnemius & Soleus', description: 'The major calf muscles that connect to the Achilles tendon.' }
    ]
  },
  {
    id: 'right-foot',
    name: 'Right Foot',
    system: 'Skeletal/Muscular',
    description: 'A complex structure providing balance, support, and locomotion.',
    theory: 'Architecturally, the human foot acts mechanically as a tripodal foundation, composed structurally of three specialized arching formations to distribute enormous weight. Upon heel strike, its numerous interlocking tarsal, metatarsal, and phalangeal bones seamlessly transition functionally from an adaptable, shock-absorbing appendage into a distinctly stiff lever necessary to physically launch the entire frame dynamically into the next step.',
    position: [-0.22, -1.55, 0.1],
    scale: [0.14, 0.08, 0.28],
    shape: 'box',
    color: '#00b8ff',
    details: ['26 bones', '33 joints', '~8,000 steps/day avg', '3 arches for support'],
    subParts: [
      { name: 'Tarsals', description: 'The 7 bones composing the ankle and heel, including the calcaneus (heel bone).' },
      { name: 'Metatarsals', description: 'The 5 long bones of the mid-foot.' },
      { name: 'Phalanges', description: 'The 14 toe bones.' }
    ]
  },
  {
    id: 'left-foot',
    name: 'Left Foot',
    system: 'Skeletal/Muscular',
    description: 'A complex structure providing balance, support, and locomotion.',
    theory: 'Architecturally, the human foot acts mechanically as a tripodal foundation, composed structurally of three specialized arching formations to distribute enormous weight. Upon heel strike, its numerous interlocking tarsal, metatarsal, and phalangeal bones seamlessly transition functionally from an adaptable, shock-absorbing appendage into a distinctly stiff lever necessary to physically launch the entire frame dynamically into the next step.',
    position: [0.22, -1.55, 0.1],
    scale: [0.14, 0.08, 0.28],
    shape: 'box',
    color: '#00b8ff',
    details: ['26 bones', '33 joints', '~8,000 steps/day avg', '3 arches for support'],
    subParts: [
      { name: 'Tarsals', description: 'The 7 bones composing the ankle and heel, including the calcaneus (heel bone).' },
      { name: 'Metatarsals', description: 'The 5 long bones of the mid-foot.' },
      { name: 'Phalanges', description: 'The 14 toe bones.' }
    ]
  },
];

export const bodySystems = [
  { id: 'all', name: 'All Systems', color: '#00d4aa' },
  { id: 'Skeletal', name: 'Skeletal', color: '#0088cc' },
  { id: 'Muscular', name: 'Muscular', color: '#ff1155' },
  { id: 'Nervous', name: 'Nervous', color: '#cc44ff' },
  { id: 'Cardiovascular', name: 'Cardiovascular', color: '#ff1155' },
  { id: 'Respiratory', name: 'Respiratory', color: '#00ffcc' },
  { id: 'Digestive', name: 'Digestive', color: '#ff8800' },
  { id: 'Urinary', name: 'Urinary', color: '#ff4400' },
  { id: 'Sensory', name: 'Sensory', color: '#ffffff' },
  { id: 'Skeletal/Muscular', name: 'Skeletal/Muscular', color: '#00b8ff' },
];
