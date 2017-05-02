var bears = [{
    "id": 0,
    "username": "goldroger",
    "name": "Gol D. Roger",
    "position": "Pirate King"
  },
  {
    "id": 1,
    "username": "mrzero",
    "name": "Sir Crocodile",
    "position": "Former-Shichibukai"
  },
  {
    "id": 2,
    "username": "luffy",
    "name": "Monkey D. Luffy",
    "position": "Captain"
  },
  {
    "id": 3,
    "username": "kuzan",
    "name": "Aokiji",
    "position": "Former Marine Admiral"
  },
  {
    "id": 4,
    "username": "shanks",
    "name": "'Red-Haired' Shanks",
    "position": "The 4 Emperors"
  }
];

exports.findAll = function() {
  return bears;
};

exports.findById = function(id) {
  for (var i = 0; i < bears.length; i++) {
    if (bears[i].id == id) {
      return bears[i];
    }
  }
};

exports.save = function(bear) {
  bears.push(bear);
};
