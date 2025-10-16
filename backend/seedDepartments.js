const mongoose = require('mongoose');
const Department = require('./models/department');

mongoose.connect('mongodb://localhost:27017/mediserve', { useNewUrlParser: true, useUnifiedTopology: true });

const departments = [
  { name: 'Emergency', description: '24/7 emergency care', contactPhone: '0912345678', location: 'Building A, Ground floor' },
  { name: 'Surgery', description: 'General surgery department', contactPhone: '0912345679', location: 'Building B, 1st floor' },
  { name: 'Internal Medicine', description: 'Medical treatment and consultation', contactPhone: '0912345680', location: 'Building C, 2nd floor' },
  { name: 'Pediatrics', description: 'Child healthcare services', contactPhone: '0912345681', location: 'Building D, 2nd floor' },
  { name: 'Obstetrics & Gynecology', description: 'Women health services', contactPhone: '0912345682', location: 'Building E, 3rd floor' },
  { name: 'Radiology', description: 'Imaging services', contactPhone: '0912345683', location: 'Building F, 1st floor' },
  { name: 'Laboratory', description: 'Medical lab tests', contactPhone: '0912345684', location: 'Building G, 1st floor' },
  { name: 'Pharmacy', description: 'Medication distribution', contactPhone: '0912345685', location: 'Building H, Ground floor' },
  { name: 'ICU', description: 'Intensive care unit', contactPhone: '0912345686', location: 'Building I, 3rd floor' },
  { name: 'Cardiology', description: 'Heart and vascular services', contactPhone: '0912345687', location: 'Building J, 2nd floor' },
  { name: 'Neurology', description: 'Brain and nervous system', contactPhone: '0912345688', location: 'Building K, 2nd floor' },
  { name: 'Orthopedics', description: 'Bone and joint care', contactPhone: '0912345689', location: 'Building L, 2nd floor' },
  { name: 'ENT', description: 'Ear, nose, throat department', contactPhone: '0912345690', location: 'Building M, 2nd floor' },
  { name: 'Dermatology', description: 'Skin care services', contactPhone: '0912345691', location: 'Building N, 1st floor' }
];

async function seed() {
  try {
    await Department.deleteMany({});
    await Department.insertMany(departments);
    console.log('Departments seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seed();
