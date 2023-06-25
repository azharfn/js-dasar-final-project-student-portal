function process_argv() {
    const { argv } = process;
    const result = studentPortal(argv[2]);

    return result;
}

function studentPortal(studentId) {
    const studentList = [
        {
            id: "2010310164",
            name: "Rakanda Pangeran Nasution",
            gpa: 2.65,
            status: false,
        },
        {
            id: "2011310021",
            name: "Yosef Noferianus Gea",
            gpa: 3.1,
            status: true,
        },
        {
            id: "2014310100",
            name: "Angelia",
            gpa: 1.25,
            status: true,
        },
        {
            id: "2011320090",
            name: "Dito Bagus Prasetio",
            gpa: 2.75,
            status: true,
        },
        {
            id: "2011320100",
            name: "Hikman Nurahman",
            gpa: 2.45,
            status: true,
        },
        {
            id: "2010320181",
            name: "Edizon",
            gpa: 1.95,
            status: true,
        },
        {
            id: "2012320055",
            name: "Marrisa Stella",
            gpa: 3.5,
            status: false,
        },
        {
            id: "2012330080",
            name: "Dea Christy Keliat",
            gpa: 3,
            status: true,
        },
        {
            id: "2013330049",
            name: "Sekarini Mahyaswari",
            gpa: 3.5,
            status: true,
        },
        {
            id: "2012330004",
            name: "Yerica",
            gpa: 3.15,
            status: false,
        },
    ];

    //MAIN Program
    //inialisasi variable untuk mencari id menggunakan function find // s adalah variable baru untuk mencari objectnya yaitu id
    const student = studentList.find((s) => s.id === studentId);
    if(!student){
        //console.log()
        return `Mahasiswa tidak terdaftar`;
    }
    if(!student.status){
        //console.log()
        return `Mahasiswa dengan id ${studentId} sudah tidak aktif`;
    }
    //deklarasi variable baru untuk mengambil function lain
    const credits = getCredits(student.gpa)
    //kemudian variabel credit akan diteruskan ke variable subjectGet untuk mendapatkan subject di function getSubject
    const subjectGet = getSubjects(credits)
    //tampilkan output
    const result = {
        id: student.id,
        name: student.name,
        gpa: student.gpa,
        credits: credits,
        subjects: subjectGet,

    };
    return result;
    

}

function getCredits(gpa) {
//Program getCredits
    if (gpa > 2.99){
        return 24;
    }
    else if (gpa >= 2.5 && gpa <= 2.99){
        return 21;
    }
    else if (gpa >= 2 && gpa <= 2.49){
        return 18;
    }
    else if (gpa >= 1.5 && gpa <= 1.99){
        return 15;
    }
    else {
        return 12;
    }
}

function getSubjects(credits) {

    const subjectsList = [
        {
            subjectName: "Ilmu Politik",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Ilmu Ekonomi",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Estetika",
            credit: 1,
            status: "pilihan",
        },
        {
            subjectName: "Kepemimpinan",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Etika",
            credit: 2,
            status: "pilihan",
        },
        {
            subjectName: "Sosiologi",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Teori Pengambil keputusan",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Statistika",
            credit: 3,
            status: "wajib",
        },
        {
            subjectName: "Aplikasi IT",
            credit: 3,
            status: "pilihan",
        },
    ];
    //Program getSubject
    //deklarasi variable baru untuk Filter mata kuliah wajib dan pilihan
    const wajibSub = subjectsList.filter((subject) => subject.status === "wajib");
    const pilihanSub = subjectsList.filter((subject) => subject.status === "pilihan")
    //deklarasi variable baru dan gunakan sort/ urutkan berdasarkan jumlah kredit yg diambil 
    const sortWajibSub = wajibSub.sort((a, b) => b.credit - a.credit);
    const sortPilihanSub = pilihanSub.sort((a, b) => b.credit - a.credit);

    //ambil mata kuliah sebanyak kredit yang diminta, dimulai dari mata kuliah wajib dilanjut pilihan
    const takenSubjects = [];
    let totalCredit = 0;

    //ambil subject mata kuliah yang status "wajib" disini menggunakan for-of 
    for (let subject of sortWajibSub) {
        if (totalCredit + subject.credit <= credits) {
        takenSubjects.push(subject);
        totalCredit += subject.credit;
        }
    }
    //kemudian jika kredit masih sisa atau kurang dari yg diminta, maka ambil subject matkul status "pilihan"
    if (totalCredit < credits) {
        for (let subject of sortPilihanSub) {
        if (totalCredit + subject.credit <= credits) {
            takenSubjects.push(subject);
            totalCredit += subject.credit;
        }
        }
    }
    //NOTE REMINDER!!
    //-JIKA MENGGUNAKAN FOR BIASA
    /*for (let i = 0; i < sortWajib.length; i++) {
        const subject = sortWajib[i];
        if (totalCredit + subject.credit <= credits) {
          takenSubjects.push(subject);
          totalCredit += subject.credit;
        }
      }
    
      // Jika kredit yang diambil masih kurang dari yang diminta, ambil mata kuliah pilihan
      if (totalCredit < credits) {
        for (let i = 0; i < sortPilihan.length; i++) {
          const subject = sortPilihan[i];
          if (totalCredit + subject.credit <= credits) {
            takenSubjects.push(subject);
            totalCredit += subject.credit;
          }
        }
      }*/
    //-JIKA MENGGUNAKAN FOR EACH
    /*sortWajib.forEach((subject) => {
  if (totalCredit + subject.credit <= credits) {
    takenSubjects.push(subject);
    totalCredit += subject.credit;
  }
});

// Jika kredit yang diambil masih kurang dari yang diminta, ambil mata kuliah pilihan
if (totalCredit < credits) {
  sortPilihan.forEach((subject) => {
    if (totalCredit + subject.credit <= credits) {
      takenSubjects.push(subject);
      totalCredit += subject.credit;
    }
  });
} 
*/
    //-JIKA menggunakan looping for semua di function getSubject
    /*
function getSubject(subjectsList, credits) {
  // Filter mata kuliah wajib dan pilihan
  const wajibSub = [];
  const pilihanSub = [];

  for (let subject of subjectsList) {
    if (subject.status === "wajib") {
      wajibSub.push(subject);
    } else if (subject.status === "pilihan") {
      pilihanSub.push(subject);
    }
  }

  // Urutkan mata kuliah wajib berdasarkan jumlah kredit yang diambil
  const sortWajib = [];
  for (let i = 0; i < wajibSub.length; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < wajibSub.length; j++) {
      if (wajibSub[j].credit > wajibSub[maxIndex].credit) {
        maxIndex = j;
      }
    }
    [wajibSub[i], wajibSub[maxIndex]] = [wajibSub[maxIndex], wajibSub[i]];
    sortWajib.push(wajibSub[i]);
  }

  // Urutkan mata kuliah pilihan berdasarkan jumlah kredit yang diambil
  const sortPilihan = [];
  for (let i = 0; i < pilihanSub.length; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < pilihanSub.length; j++) {
      if (pilihanSub[j].credit > pilihanSub[maxIndex].credit) {
        maxIndex = j;
      }
    }
    [pilihanSub[i], pilihanSub[maxIndex]] = [pilihanSub[maxIndex], pilihanSub[i]];
    sortPilihan.push(pilihanSub[i]);
  }

  // Ambil mata kuliah sebanyak kredit yang diminta, dimulai dari mata kuliah wajib
  const takenSubjects = [];
  let totalCredit = 0;

  for (let i = 0; i < sortWajib.length; i++) {
    if (totalCredit + sortWajib[i].credit <= credits) {
      takenSubjects.push(sortWajib[i]);
      totalCredit += sortWajib[i].credit;
    }
  }

  // Jika kredit yang diambil masih kurang dari yang diminta, ambil mata kuliah pilihan
  if (totalCredit < credits) {
    for (let i = 0; i < sortPilihan.length; i++) {
      if (totalCredit + sortPilihan[i].credit <= credits) {
        takenSubjects.push(sortPilihan[i]);
        totalCredit += sortPilihan[i].credit;
      }
    }
  }

  // Kembalikan daftar mata kuliah yang diambil
  return takenSubjects;
}
*/
return takenSubjects;

}


// Dilarang menghapus/mangganti code dibawah ini!!!
if (process.env.NODE_ENV !== "test") {
    console.log(process_argv());
}

module.exports = {
    studentPortal,
    getSubjects,
    getCredits,
};
