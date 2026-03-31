const fs = require('fs');
const filePath = 'c:\\\\Users\\\\VICTUS\\\\Desktop\\\\body-weaver\\\\src\\\\data\\\\bodyParts.ts';

let content = fs.readFileSync(filePath, 'utf8');

// Update Interface
if (!content.includes('export interface SubPartData')) {
    content = content.replace('export interface BodyPartData {', 
`export interface SubPartData {
  name: string;
  description: string;
}

export interface BodyPartData {`);
    
    content = content.replace('modelPath?: string;', 
`modelPath?: string;
  subParts?: SubPartData[];`);
}

const updates = {
    'skull': [
        { name: 'Cranial Vault', description: 'The upper part forming the enclosure for the brain.' },
        { name: 'Facial Skeleton', description: 'Forms the highly complex structure of the face.' },
        { name: 'Mandible', description: 'The lower jawbone, the only movable bone of the skull.' }
    ],
    'brain': [
        { name: 'Cerebrum', description: 'Handles conscious thought, language, and voluntary movement.' },
        { name: 'Cerebellum', description: 'Coordinates fine muscle movement, balance, and posture.' },
        { name: 'Brainstem', description: 'Controls automatic functions like breathing, heart rate, and blood pressure.' },
        { name: 'Diencephalon', description: 'Contains the thalamus and hypothalamus; relays sensory info and controls homeostasis.' }
    ],
    'eyes': [
        { name: 'Cornea', description: 'The clear front surface that focuses light entering the eye.' },
        { name: 'Lens', description: 'Focuses light precisely onto the retina.' },
        { name: 'Retina', description: 'The light-sensitive inner lining containing photoreceptors (rods and cones).' },
        { name: 'Optic Nerve', description: 'Transmits visual information from the retina to the brain.' }
    ],
    'neck': [
        { name: 'Cervical Vertebrae', description: 'The 7 bones providing structural support for the neck.' },
        { name: 'Trachea', description: 'The windpipe connecting the larynx to the bronchi.' },
        { name: 'Esophagus', description: 'The muscular tube connecting the throat with the stomach.' },
        { name: 'Thyroid Gland', description: 'Endocrine gland that regulates metabolism.' }
    ],
    'ribcage': [
        { name: 'Sternum', description: 'The flat bone at the center of the chest (breastbone).' },
        { name: 'True Ribs', description: 'First 7 pairs, attached directly to the sternum.' },
        { name: 'False & Floating Ribs', description: 'Lower 5 pairs, attaching indirectly or not at all to the sternum.' }
    ],
    'heart': [
        { name: 'Atria', description: 'The two upper receiving chambers for blood.' },
        { name: 'Ventricles', description: 'The two lower discharging chambers that pump blood out.' },
        { name: 'Heart Valves', description: 'Prevent the backward flow of blood.' },
        { name: 'Aorta', description: 'The main artery carrying oxygenated blood away from the heart.' }
    ],
    'lungs': [
        { name: 'Trachea & Bronchi', description: 'The airways leading down into the lungs.' },
        { name: 'Alveoli', description: 'Microscopic air sacs where gas exchange occurs.' },
        { name: 'Pleura', description: 'The membranes enclosing the lungs.' }
    ],
    'spine': [
        { name: 'Cervical Region', description: 'The neck region (C1-C7).' },
        { name: 'Thoracic Region', description: 'The mid-back region articulating with the ribs (T1-T12).' },
        { name: 'Lumbar Region', description: 'The lower back region supporting upper body weight (L1-L5).' },
        { name: 'Sacrum & Coccyx', description: 'The fused lower regions connecting to the pelvis.' }
    ],
    'stomach': [
        { name: 'Cardia', description: 'Where food enters from the esophagus.' },
        { name: 'Fundus', description: 'The upper rounded part, storing undigested food and gases.' },
        { name: 'Body (Corpus)', description: 'The main, central region for churning and mixing.' },
        { name: 'Pylorus', description: 'The valve that connects the stomach to the small intestine.' }
    ],
    'liver': [
        { name: 'Right Lobe', description: 'The largest lobe of the liver.' },
        { name: 'Left Lobe', description: 'Smaller and flatter than the right lobe.' },
        { name: 'Gallbladder', description: 'Sits under the liver; stores and concentrates bile.' },
        { name: 'Hepatic Portal Vein', description: 'Carries nutrient-rich blood from the digestive tract to the liver.' }
    ],
    'kidneys': [
        { name: 'Renal Cortex', description: 'The outer region containing millions of filtering nephrons.' },
        { name: 'Renal Medulla', description: 'The inner region containing the renal pyramids.' },
        { name: 'Renal Pelvis', description: 'The funnel-like dilated part of the ureter in the kidney.' },
        { name: 'Ureters', description: 'Tubes carrying urine from the kidneys to the bladder.' }
    ],
    'intestines': [
        { name: 'Duodenum', description: 'The first part of the small intestine; receives bile and pancreatic juice.' },
        { name: 'Jejunum & Ileum', description: 'The remaining sections of the small intestine where most absorption occurs.' },
        { name: 'Colon', description: 'The main part of the large intestine; extracts water and salt.' },
        { name: 'Rectum', description: 'The final section of the large intestine, terminating at the anus.' }
    ],
    'pelvis': [
        { name: 'Ilium', description: 'The largest and uppermost pelvic bone.' },
        { name: 'Ischium', description: 'The lower, back part of the pelvic bone.' },
        { name: 'Pubis', description: 'The forward portion of the pelvic bone.' }
    ],
    'right-shoulder': [
        { name: 'Clavicle', description: 'The collarbone, acting as a strut.' },
        { name: 'Scapula', description: 'The shoulder blade, connecting the humerus with the clavicle.' },
        { name: 'Rotator Cuff', description: 'Group of muscles and their tendons acting to stabilize the shoulder.' }
    ],
    'left-shoulder': [
        { name: 'Clavicle', description: 'The collarbone, acting as a strut.' },
        { name: 'Scapula', description: 'The shoulder blade, connecting the humerus with the clavicle.' },
        { name: 'Rotator Cuff', description: 'Group of muscles and their tendons acting to stabilize the shoulder.' }
    ],
    'right-upper-arm': [
        { name: 'Humerus', description: 'The long bone in the upper arm.' },
        { name: 'Biceps Brachii', description: 'Muscle on the front of the upper arm, primarily for flexing the elbow.' },
        { name: 'Triceps Brachii', description: 'Muscle on the back of the upper arm, primarily for extending the elbow.' }
    ],
    'left-upper-arm': [
         { name: 'Humerus', description: 'The long bone in the upper arm.' },
         { name: 'Biceps Brachii', description: 'Muscle on the front of the upper arm, primarily for flexing the elbow.' },
         { name: 'Triceps Brachii', description: 'Muscle on the back of the upper arm, primarily for extending the elbow.' }
    ],
    'right-forearm': [
        { name: 'Radius', description: 'The bone on the thumb side of the forearm.' },
        { name: 'Ulna', description: 'The bone on the pinky finger side of the forearm.' },
        { name: 'Flexors & Extensors', description: 'Muscle groups managing hand and wrist articulation.' }
    ],
    'left-forearm': [
         { name: 'Radius', description: 'The bone on the thumb side of the forearm.' },
         { name: 'Ulna', description: 'The bone on the pinky finger side of the forearm.' },
         { name: 'Flexors & Extensors', description: 'Muscle groups managing hand and wrist articulation.' }
    ],
    'right-hand': [
        { name: 'Carpals', description: 'The 8 wrist bones.' },
        { name: 'Metacarpals', description: 'The 5 bones of the mid-hand.' },
        { name: 'Phalanges', description: 'The 14 bones making up the fingers and thumb.' }
    ],
    'left-hand': [
        { name: 'Carpals', description: 'The 8 wrist bones.' },
        { name: 'Metacarpals', description: 'The 5 bones of the mid-hand.' },
        { name: 'Phalanges', description: 'The 14 bones making up the fingers and thumb.' }
    ],
    'right-thigh': [
        { name: 'Femur', description: 'The thigh bone, the longest and strongest in the body.' },
        { name: 'Quadriceps', description: 'Group of 4 muscles on the front of the thigh.' },
        { name: 'Hamstrings', description: 'Group of 3 muscles on the back of the thigh.' }
    ],
    'left-thigh': [
        { name: 'Femur', description: 'The thigh bone, the longest and strongest in the body.' },
        { name: 'Quadriceps', description: 'Group of 4 muscles on the front of the thigh.' },
        { name: 'Hamstrings', description: 'Group of 3 muscles on the back of the thigh.' }
    ],
    'right-knee': [
        { name: 'Patella', description: 'The kneecap, a thick, circular-triangular bone.' },
        { name: 'Meniscus', description: 'C-shaped pieces of tough, rubbery cartilage acting as shock absorbers.' },
        { name: 'Cruciate Ligaments (ACL/PCL)', description: 'Cross inside the knee joint, controlling back-and-forth motion.' }
    ],
    'left-knee': [
        { name: 'Patella', description: 'The kneecap, a thick, circular-triangular bone.' },
        { name: 'Meniscus', description: 'C-shaped pieces of tough, rubbery cartilage acting as shock absorbers.' },
        { name: 'Cruciate Ligaments (ACL/PCL)', description: 'Cross inside the knee joint, controlling back-and-forth motion.' }
    ],
    'right-lower-leg': [
        { name: 'Tibia', description: 'The shinbone, larger and stronger, bears most of the weight.' },
        { name: 'Fibula', description: 'The calf bone, smaller, located on the outer side.' },
        { name: 'Gastrocnemius & Soleus', description: 'The major calf muscles that connect to the Achilles tendon.' }
    ],
    'left-lower-leg': [
        { name: 'Tibia', description: 'The shinbone, larger and stronger, bears most of the weight.' },
        { name: 'Fibula', description: 'The calf bone, smaller, located on the outer side.' },
        { name: 'Gastrocnemius & Soleus', description: 'The major calf muscles that connect to the Achilles tendon.' }
    ],
    'right-foot': [
        { name: 'Tarsals', description: 'The 7 bones composing the ankle and heel, including the calcaneus (heel bone).' },
        { name: 'Metatarsals', description: 'The 5 long bones of the mid-foot.' },
        { name: 'Phalanges', description: 'The 14 toe bones.' }
    ],
    'left-foot': [
        { name: 'Tarsals', description: 'The 7 bones composing the ankle and heel, including the calcaneus (heel bone).' },
        { name: 'Metatarsals', description: 'The 5 long bones of the mid-foot.' },
        { name: 'Phalanges', description: 'The 14 toe bones.' }
    ]
};

// Replace details carefully
for (const [id, subParts] of Object.entries(updates)) {
    const searchStr = \`id: '\${id}',\`;
    const searchStr2 = \`id: "\${id}",\`;
    let pos = content.indexOf(searchStr);
    if (pos === -1) pos = content.indexOf(searchStr2);
    
    if (pos !== -1) {
        let detailsPos = content.indexOf("details: [", pos);
        let endObjPos = content.indexOf("},", detailsPos);
        
        if (endObjPos !== -1) {
            let partText = content.substring(pos, endObjPos);
            if (!partText.includes('subParts:')) {
                let subPartsString = JSON.stringify(subParts);
                // Simple format to keep the file somewhat readable without big regexes
                content = content.substring(0, endObjPos) + \`  subParts: \${subPartsString},\\n  \` + content.substring(endObjPos);
                
                // Then let's reformat the subParts list to look like actual code:
                content = content.replace(\`subParts: \${subPartsString}\`, \`subParts: [\n    \` + subParts.map(s => \`{ name: '\${s.name.replace(/'/g, "\\\\'")}', description: '\${s.description.replace(/'/g, "\\\\'")}' }\`).join(',\n    ') + \`\n  ]\`);
            }
        }
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done!');
