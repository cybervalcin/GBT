export const MAKE_OPTIONS_CA = [
  "Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Ford","Genesis",
  "GMC","Honda","Hyundai","Infiniti","Jaguar","Jeep","Kia","Land Rover","Lexus","Lincoln",
  "Mazda","Mercedes-Benz","MINI","Mitsubishi","Nissan","Porsche","Ram","Subaru","Tesla",
  "Toyota","Volkswagen","Volvo",
  "Harley-Davidson","Kawasaki","KTM","Suzuki","Triumph","Yamaha","Ducati","BMW Motorrad","Can-Am"
];

export const MODELS_BY_MAKE_CA = {
  Acura: ["ILX","TLX","Integra","RDX","MDX"],
  Audi: ["A3","A4","A5","A6","A7","Q3","Q5","Q7","Q8","e-tron"],
  BMW: ["2 Series","3 Series","4 Series","5 Series","X1","X3","X5","X6","X7","i4","iX"],
  Buick: ["Encore","Encore GX","Envision","Enclave"],
  Cadillac: ["CT4","CT5","Escalade","XT4","XT5","XT6","LYRIQ"],
  Chevrolet: ["Spark","Sonic","Cruze","Malibu","Impala","Camaro","Corvette","Trax","Equinox","Blazer","Traverse","Tahoe","Suburban","Colorado","Silverado 1500","Silverado HD"],
  Chrysler: ["300","Pacifica","Voyager"],
  Dodge: ["Charger","Challenger","Durango","Hornet"],
  Ford: ["Fiesta","Focus","Fusion","Mustang","Escape","Edge","Explorer","Expedition","Bronco","Bronco Sport","Ranger","F-150","Super Duty","Mustang Mach-E"],
  Genesis: ["G70","G80","G90","GV70","GV80"],
  GMC: ["Terrain","Acadia","Yukon","Canyon","Sierra 1500","Sierra HD"],
  Honda: ["Civic","Accord","Insight","CR-V","HR-V","Pilot","Passport","Ridgeline","Odyssey"],
  Hyundai: ["Elantra","Sonata","Kona","Tucson","Santa Fe","Palisade","Ioniq 5","Ioniq 6"],
  Infiniti: ["Q50","Q60","QX50","QX55","QX60","QX80"],
  Jaguar: ["XE","XF","F-PACE","E-PACE","I-PACE","F-TYPE"],
  Jeep: ["Compass","Cherokee","Grand Cherokee","Wrangler","Gladiator","Renegade"],
  Kia: ["Forte","K5","Soul","Seltos","Sportage","Sorento","Telluride","Carnival","EV6","Niro EV"],
  "Land Rover": ["Range Rover","Range Rover Sport","Range Rover Velar","Range Rover Evoque","Discovery","Discovery Sport","Defender"],
  Lexus: ["IS","ES","LS","NX","RX","GX","LX","UX"],
  Lincoln: ["Corsair","Nautilus","Aviator","Navigator"],
  Mazda: ["Mazda3","Mazda6","CX-30","CX-5","CX-50","CX-9","CX-90","MX-5 Miata"],
  "Mercedes-Benz": ["A-Class","C-Class","E-Class","S-Class","CLA","GLA","GLB","GLC","GLE","GLS","EQB","EQE","EQS"],
  MINI: ["Cooper","Countryman","Clubman"],
  Mitsubishi: ["Mirage","RVR","Outlander","Outlander PHEV","Eclipse Cross"],
  Nissan: ["Sentra","Altima","Maxima","Versa","Rogue","Murano","Pathfinder","Armada","Kicks","Frontier","Titan","Leaf"],
  Porsche: ["911","Cayman","Boxster","Cayenne","Macan","Panamera","Taycan"],
  Ram: ["1500","2500","3500","ProMaster"],
  Subaru: ["Impreza","Legacy","WRX","Crosstrek","Forester","Outback","Ascent"],
  Tesla: ["Model 3","Model Y","Model S","Model X","Cybertruck"],
  Toyota: ["Corolla","Camry","Prius","GR86","Supra","RAV4","Highlander","4Runner","Sequoia","Venza","C-HR","Tacoma","Tundra","Sienna"],
  Volkswagen: ["Jetta","Golf","Passat","Tiguan","Taos","Atlas","ID.4"],
  Volvo: ["S60","S90","XC40","XC60","XC90","C40 Recharge"],
  "Harley-Davidson": ["Sportster","Softail","Touring","Street Glide","Road Glide"],
  Kawasaki: ["Ninja 400","Ninja 650","Ninja ZX-6R","Z400","Z650","Versys 650"],
  KTM: ["Duke 390","Duke 790","Duke 890","RC 390","Adventure 390"],
  Suzuki: ["GSX-R600","GSX-R750","GSX-R1000","SV650","V-Strom 650"],
  Triumph: ["Street Triple","Speed Triple","Bonneville","Tiger 900","Tiger 1200"],
  Yamaha: ["MT-07","MT-09","YZF-R3","YZF-R6","YZF-R1","Tenere 700"],
  Ducati: ["Monster","Panigale","Scrambler","Multistrada","Diavel"],
  "BMW Motorrad": ["G 310 R","F 750 GS","F 850 GS","R 1250 GS","S 1000 RR"],
  "Can-Am": ["Spyder","Ryker"]
};

export const POPULAR_CHIPS_BY_VEHICLE_TYPE = {
  sedan: [
    { make: "Toyota", models: ["Corolla","Camry"] },
    { make: "Honda", models: ["Civic","Accord"] },
    { make: "Hyundai", models: ["Elantra","Sonata"] },
    { make: "Nissan", models: ["Sentra","Altima"] }
  ],
  suv: [
    { make: "Toyota", models: ["RAV4","Highlander"] },
    { make: "Honda", models: ["CR-V","Pilot"] },
    { make: "Mazda", models: ["CX-5","CX-50"] },
    { make: "Hyundai", models: ["Tucson","Santa Fe"] }
  ],
  pickup: [
    { make: "Ford", models: ["F-150","Ranger"] },
    { make: "Chevrolet", models: ["Silverado 1500","Colorado"] },
    { make: "GMC", models: ["Sierra 1500","Canyon"] },
    { make: "Ram", models: ["1500","2500"] },
    { make: "Toyota", models: ["Tacoma","Tundra"] }
  ],
  exotic: [
    { make: "Porsche", models: ["911","Cayenne","Taycan"] },
    { make: "BMW", models: ["M3","M4"] },
    { make: "Mercedes-Benz", models: ["AMG C 63","AMG GLE"] },
    { make: "Audi", models: ["RS5","R8"] },
    { make: "Land Rover", models: ["Range Rover Sport","Defender"] }
  ],
  electric: [
    { make: "Tesla", models: ["Model 3","Model Y"] },
    { make: "Hyundai", models: ["Ioniq 5","Ioniq 6"] },
    { make: "Kia", models: ["EV6","Niro EV"] },
    { make: "Volkswagen", models: ["ID.4"] },
    { make: "Volvo", models: ["XC40","C40 Recharge"] }
  ],
  motorcycle: [
    { make: "Yamaha", models: ["MT-07","YZF-R3"] },
    { make: "Kawasaki", models: ["Ninja 400","Z650"] },
    { make: "Harley-Davidson", models: ["Sportster","Street Glide"] },
    { make: "Ducati", models: ["Monster","Panigale"] }
  ]
};
