require('dotenv').config();
const express = require('express');


const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors()); // Enable CORS to allow frontend to communicate with backend
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle URL-encoded form data



// Handle form submission
app.post('/submit', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'roomImages1', maxCount: 10 },
  { name: 'roomImages2', maxCount: 10 },
  { name: 'roomImages3', maxCount: 10 },
  { name: 'roomImages4', maxCount: 10 },
  { name: 'contractForm', maxCount: 10 },
  { name: 'cancelledCheque', maxCount: 10 },
  { name: 'eBill', maxCount: 10 },
  { name: 'gstPdf', maxCount: 10 },
  { name: 'panPdf', maxCount: 10 },
  { name: 'letterHead', maxCount: 10 },
  { name: 'tradeLicence', maxCount: 10 },
  { name: 'itrPdf', maxCount: 10 },
  { name: 'logoPdf', maxCount: 10 }

  // all pdf files
  // { name: 'contractForm', maxCount: 10 },
  // { name: 'eBill', maxCount: 10 },
  // { name: 'gstPdf', maxCount: 10 },
  // { name: 'panPdf', maxCount: 10 },
  // { name: 'letterHead', maxCount: 10 },
  // { name: 'tradeLicence', maxCount: 10 },




  
]), async (req, res) => {
  try {
    const {
      // ***hotel section ends here
      ownerName,
      contactNumber,
      gmName,
      gmContactPhone,
      companyName,
      companyDisplayName,
      contactEmail,
      contactPhone,
      hotelWebUrl,
      address,
      state,
      pincode,
      checkIn,
      checkOut,
      // ************Ist Room section starts here**********
      roomName1,
      noOfRooms1,
      roomSize1,
      bedType1,
      ratePlan1,
      roomView1,
            // here images section
      occupancy1,
      amenities1,
        // ************1st Room section ends here**********
  




          // ************2nd room section starts here**********
      roomName2,
      noOfRooms2,
      roomSize2,
      bedType2,
      ratePlan2,
      roomView2,
            // here images section
      occupancy2,
      amenities2,
        // ************ 2ndroom section ends here**********


          // ************3rd room section starts here**********
      roomName3,
      noOfRooms3,
      roomSize3,
      bedType3,
      ratePlan3,
      roomView3,
            // here images section
      occupancy3,
      amenities3,
        // ************ 3rd room section ends here**********



        // ************ website details section starts here**********

      webSite,
      haveSite,
      siteUrl,
      hostProvider,
      hostId,
      hostPassword,
      domainProvider,
      domainId,
      domainPassword,
      hostUrl,
      domainUrl,
      developerNo,
      // ************ website details section ends here**********

// OTA DETAILS 
haveOta,
howmanyOta,
ghcUrl,
selectFirstOta,
firstOid,
firstOpass,
selectsecondOta,
secondOid,
secondOpass,
selectthirdOta,
thirdOid,
thirdOpass,
selectfourthOta,
fourOid,
fourOpass,
wantOta,
userOmail,
userOmobile,
nameOfOta,




// POC DETAILS
nameOfPoc,
emailOfPoc,
noOfPoc,



    } = req.body;

    console.log('Received form data:', req.body);
    console.log('Uploaded files:', req.files);

   // Combine all uploaded images into a single array
   const allFiles = [];
   ['roomImages1', 'roomImages2', 'roomImages3' , "images" ,'roomImages4' , 'contractForm', 'cancelledCheque', 'eBill', 'gstPdf', 'panPdf', 'letterHead', 'tradeLicence', 'itrPdf', 'logoPdf' ].forEach(key => {
     if (req.files[key]) {
       req.files[key].forEach(file => {
         allFiles.push(file);
       });
     }
   });

   // Process images
   let imageFiles = await Promise.all(
     allFiles.map(async (file) => {
       const content = await readFileAsync(file.path);
       return {
         filename: file.originalname,
         content: content
       };
     })
   );

   // Optionally delete the files after reading them
   allFiles.forEach(file => {
     fs.unlinkSync(file.path);
   });

    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL, // Replace with your actual email
        pass: process.env.EMAIL_PASSWORD// Replace with your actual email password
      }
    });

    // Construct the email body with the form data
    const emailBody = `
          <h1 style="color:#260D88">*****Hotel Details*****</h1>
      <p><strong>Owner Name:</strong> ${ownerName}</p>
      <p><strong>Contact Number:</strong> ${contactNumber}</p>
      <p><strong>Name of The G.M:</strong> ${gmName}</p>
      <p><strong>Contact Phone (G.M):</strong> ${gmContactPhone}</p>
      <p><strong>Company Name:</strong> ${companyName}</p>
      <p><strong>Company Display Name:</strong> ${companyDisplayName}</p>
      <p><strong>Contact Email:</strong> ${contactEmail}</p>
      <p><strong>Contact Phone:</strong> ${contactPhone}</p>
      <p><strong>Hotel Web URL:</strong> ${hotelWebUrl}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Pincode:</strong> ${pincode}</p>
      <p><strong>Check In Time:</strong> ${checkIn}</p>
      <p><strong>Check Out Time:</strong> ${checkOut}</p>



      <h1 style="color:#260D88">*****Room Details*****</h1>

      <p style="color:red"><i><b><u>=======1st Room=======</u></b></i></p>
      <p><strong>Room Name:</strong> ${roomName1}</p>
      <p><strong>No Of Rooms:</strong> ${noOfRooms1}</p>
      <p><strong>Room Size:</strong> ${roomSize1}</p>
      <p><strong>Bed Type:</strong> ${bedType1}</p>
      <p><strong>Rate Plane:</strong> ${ratePlan1}</p>
      <p><strong>Room View:</strong> ${roomView1}</p>
      <p><strong>Occupancy:</strong> ${occupancy1}</p>
      <p><strong>Amenities:</strong> ${amenities1}</p>

      <p style="color:red"><i><b><u>=======2nd Room=======</u></b></i></p>
      <p><strong>Room Name:</strong> ${roomName2}</p>
      <p><strong>No Of Rooms:</strong> ${noOfRooms2}</p>
      <p><strong>Room Size:</strong> ${roomSize2}</p>
      <p><strong>Bed Type:</strong> ${bedType2}</p>
      <p><strong>Rate Plane:</strong> ${ratePlan2}</p>
      <p><strong>Room View:</strong> ${roomView2}</p>
      <p><strong>Occupancy:</strong> ${occupancy2}</p>
      <p><strong>Amenities:</strong> ${amenities2}</p>


 <p style="color:red"><i><b><u>=======3rd Room=======</u></b></i></p>
      <p><strong>Room Name:</strong> ${roomName3}</p>
      <p><strong>No Of Rooms:</strong> ${noOfRooms3}</p>
      <p><strong>Room Size:</strong> ${roomSize3}</p>
      <p><strong>Bed Type:</strong> ${bedType3}</p>
      <p><strong>Rate Plane:</strong> ${ratePlan3}</p>
      <p><strong>Room View:</strong> ${roomView3}</p>
      <p><strong>Occupancy:</strong> ${occupancy3}</p>
      <p><strong>Amenities:</strong> ${amenities3}</p>


        <h1 style="color:#260D88">*****Website Details*****</h1>
      <p><strong>Have Any Site:</strong> ${webSite}</p>
      <p><strong>Is The Site Active:</strong> ${haveSite}</p>
      <p><strong>Site Url:</strong> ${siteUrl}</p>
      <p><strong>Host Provider:</strong> ${hostProvider}</p>
      <p><strong>Hosting User-id / Email:</strong> ${hostId}</p>
      <p><strong>Hosting Password:</strong> ${hostPassword}</p>
      <p><strong>Domian Provider:</strong> ${domainProvider}</p>
      <p><strong>Domain User-id / Email:</strong> ${domainId}</p>
      <p><strong>Domain Password:</strong> ${domainPassword}</p>
      <p><strong>Link For Hosting / Cpanel:</strong> ${hostUrl}</p>
      <p><strong>Link For Domain :</strong> ${domainUrl}</p>
      <p><strong>His/Her Developers NUmber :</strong> ${developerNo}</p>


        <h1 style="color:#260D88">*****OTA Details*****</h1>
         <h3 style="color:green"><i><b><u> Registration Done </u></b></i></h3>
        <p><strong>Have Any OTA:</strong> ${haveOta}</p>
        <p><strong>How Many OTA's:</strong> ${howmanyOta}</p>
        <p><strong>Google Hotel Center:</strong> ${ghcUrl}</p>

        <p><strong>Name Of 1st OTA:</strong> ${selectFirstOta}</p>
        <p><strong>User Id / Email:</strong> ${firstOid}</p>
        <p><strong>Password:</strong> ${firstOpass}</p>

        <p><strong>Name Of 2nd OTA:</strong> ${selectsecondOta}</p>
        <p><strong>User Id / Email:</strong> ${secondOid}</p>
        <p><strong>Password:</strong> ${secondOpass}</p>

        <p><strong>Name Of 3rd OTA:</strong> ${selectthirdOta}</p>
        <p><strong>User Id / Email:</strong> ${thirdOid}</p>
        <p><strong>Password:</strong> ${thirdOpass}</p>

        <p><strong>Name Of 4th OTA:</strong> ${selectfourthOta}</p>
        <p><strong>User Id / Email:</strong> ${fourOid}</p>
        <p><strong>Password:</strong> ${fourOpass}</p>

        <h3 style="color:green"><i><b><u> If Registration Not  Done </u></b></i></h3>
         <p><strong>No Of OTA's Want To Register:</strong> ${wantOta}</p>
        <p><strong>User Mail Id:</strong> ${userOmail}</p>
        <p><strong>User Mobile Number:</strong> ${userOmobile}</p>
        <p><strong>Name Of OTA'S:</strong> ${nameOfOta}</p>


        <h1 style="color:#260D88">*****Poc Details*****</h1>
        <p><strong>Poc Name:</strong> ${nameOfPoc}</p>
        <p><strong>Poc Email:</strong> ${emailOfPoc}</p>
        <p><strong>Poc Mobile:</strong> ${noOfPoc}</p>
    
     
    `;

    // Send the email with the form data and attachments
    const mailOptions = {
      from: contactEmail, // Use the contact email from the form
      to: 'shitansukumargochhayat@gmail.com  , bookingjiniimplementation@gmail.com', // The recipient email address
      subject: `IMPLEMENTATION & SUPPORT DETAILS [ ***---- ${companyName}----*** ]`,
      html: emailBody,
      attachments: imageFiles
    };

    await transporter.sendMail(mailOptions);

    res.send('Submission successful!');
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).send('Error submitting form');
  }
});

// Serve the frontend static files (optional)
// app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
