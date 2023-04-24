import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      firstName: "Shukhrat",
      lastName: "Mamadaliev",
      email: "admin@gmail.com",
      phone: "+7754234324",
      password: bcrypt.hashSync("1111", 8),
    },
    {
      firstName: "Zilola",
      lastName: "Mamadalieva",
      email: "admin@gmail.com",
      phone: "+7754234324",
      password: bcrypt.hashSync("2222s", 8),
    },
  ],
  staff: [
    {
      firstName: "Shukhrat",
      lastName: "Mamadaliev",
      email: "admin@gmail.com",
      phone: "+7754234324",
      gender: "Male",
      designation: "Manager",
      joiningDate: "02/20/2023",
      address: "24 Monthope road, E15LS",
      password: bcrypt.hashSync("1111", 8),
      isAdmin: true,
      isStaff: false,
    },
  ],
};

export default data;
