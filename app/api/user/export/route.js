import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import User from '@/lib/models/User';

export async function POST(request) {
 

  try {
    const { userId,templateId, format } = await request.json();
    console.log(templateId)
    // Fetch user details from the database
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Convert user object to a formatted string
    const userContent = JSON.stringify(user, null, 2);

    const temp1 = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 40px;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .section {
            margin-bottom: 30px;
          }
          .section h2 {
            font-size: 20px;
            color: #4A90E2;
            border-bottom: 2px solid #4A90E2;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .section p {
            font-size: 16px;
            margin: 5px 0;
          }
          .section strong {
            color: #333;
          }
          .skills, .portfolio {
            list-style-type: none;
            padding: 0;
          }
          .skills li, .portfolio li {
            background: #e0f7fa;
            margin: 5px 0;
            padding: 8px 12px;
            border-radius: 5px;
          }
          .portfolio a {
            color:rgb(109, 2, 209);
            text-decoration: none;
          }
          .portfolio a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="section">
            <h2>Personal Details</h2>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Contact:</strong> ${user.contact || 'Not available'}</p>
            <p><strong>Location:</strong> ${user.location || 'Not available'}</p>
            <p><strong>Role:</strong> ${user.role}</p>
          </div>
    
          <div class="section">
            <h2>Education</h2>
            ${user.education.map(edu => `
              <p><strong>Institution:</strong> ${edu.institution}</p>
              <p><strong>Degree:</strong> ${edu.degree}</p>
              <p><strong>Field of Study:</strong> ${edu.fieldOfStudy}</p>
              <p><strong>Start Date:</strong> ${edu.startDate ? new Date(edu.startDate).toLocaleDateString() : 'Not available'}</p>
              <p><strong>End Date:</strong> ${edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Not available'}</p>
            `).join('')}
          </div>
    
          <div class="section">
            <h2>Work Experience</h2>
            ${user.workExperience.map(work => `
              <p><strong>Company:</strong> ${work.company}</p>
              <p><strong>Position:</strong> ${work.position}</p>
              <p><strong>Start Date:</strong> ${work.startDate ? new Date(work.startDate).toLocaleDateString() : 'Not available'}</p>
              <p><strong>End Date:</strong> ${work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Not available'}</p>
              <p><strong>Description:</strong> ${work.description || 'Not available'}</p>
            `).join('')}
          </div>
    
          <div class="section">
            <h2>Skills</h2>
            <ul class="skills">
              ${user.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
    
          <div class="section">
            <h2>Certifications</h2>
            <ul class="skills">
              ${user.certifications.map(cert => `<li>${cert}</li>`).join('')}
            </ul>
          </div>
    
          <div class="section">
            <h2>Portfolio</h2>
            <ul class="portfolio">
              ${user.portfolioLinks.github ? `<li><a href="${user.portfolioLinks.github}">GitHub</a></li>` : ''}
              ${user.portfolioLinks.linkedin ? `<li><a href="${user.portfolioLinks.linkedin}">LinkedIn</a></li>` : ''}
              ${user.portfolioLinks.website ? `<li><a href="${user.portfolioLinks.website}">Personal Website</a></li>` : ''}
            </ul>
          </div>
        </div>
      </body>
    </html>
`;

const temp2 = `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f8f9fa;
        color: #333;
        margin: 20px;
      }
      h1 {
        font-size: 30px;
        text-transform: uppercase;
        color: #2d87bf;
        text-align: center;
        margin-bottom: 40px;
      }
      .section {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 30px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      }
      .section-title {
        font-size: 18px;
        text-transform: uppercase;
        color: #2d87bf;
        border-bottom: 3px solid #2d87bf;
        padding-bottom: 5px;
        margin-bottom: 15px;
        letter-spacing: 1px;
      }
      .label {
        font-weight: bold;
        display: inline-block;
        min-width: 100px;
        color: #555;
      }
      .value {
        color: #777;
      }
      .details {
        line-height: 1.6;
      }
      .details p {
        margin: 8px 0;
      }
      .skills, .portfolio {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .skills li, .portfolio li {
        background-color: #edf2f7;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 14px;
        color: #555;
        border: 1px solid #ddd;
      }
      .portfolio a {
        color:rgb(36, 172, 49);
        text-decoration: none;
        font-weight: bold;
      }
      .portfolio a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>Professional Profile</h1>
    <div class="section">
      <div class="section-title">Personal Information</div>
      <div class="details">
        <p><span class="label">Name:</span> ${user.name}</p>
        <p><span class="label">Email:</span> ${user.email}</p>
        <p><span class="label">Contact:</span> ${user.contact || 'Not available'}</p>
        <p><span class="label">Location:</span> ${user.location || 'Not available'}</p>
        <p><span class="label">Role:</span> ${user.role}</p>
      </div>
    </div>
    <div class="section">
      <div class="section-title">Education</div>
      <div class="details">
        ${user.education.map(edu => `
          <p><span class="label">Institution:</span> ${edu.institution}</p>
          <p><span class="label">Degree:</span> ${edu.degree}</p>
          <p><span class="label">Field of Study:</span> ${edu.fieldOfStudy}</p>
          <p><span class="label">Start Date:</span> ${edu.startDate ? new Date(edu.startDate).toLocaleDateString() : 'Not available'}</p>
          <p><span class="label">End Date:</span> ${edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Not available'}</p>
        `).join('')}
      </div>
    </div>
    <div class="section">
      <div class="section-title">Work Experience</div>
      <div class="details">
        ${user.workExperience.map(work => `
          <p><span class="label">Company:</span> ${work.company}</p>
          <p><span class="label">Position:</span> ${work.position}</p>
          <p><span class="label">Start Date:</span> ${work.startDate ? new Date(work.startDate).toLocaleDateString() : 'Not available'}</p>
          <p><span class="label">End Date:</span> ${work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Not available'}</p>
          <p><span class="label">Description:</span> ${work.description || 'Not available'}</p>
        `).join('')}
      </div>
    </div>
    <div class="section">
      <div class="section-title">Skills</div>
      <ul class="skills">
        ${user.skills.map(skill => `<li>${skill}</li>`).join('')}
      </ul>
    </div>
    <div class="section">
      <div class="section-title">Certifications</div>
      <ul class="skills">
        ${user.certifications.map(cert => `<li>${cert}</li>`).join('')}
      </ul>
    </div>
    <div class="section">
      <div class="section-title">Portfolio</div>
      <ul class="portfolio">
        ${user.portfolioLinks.github ? `<li><a href="${user.portfolioLinks.github}" target="_blank">GitHub</a></li>` : ''}
        ${user.portfolioLinks.linkedin ? `<li><a href="${user.portfolioLinks.linkedin}" target="_blank">LinkedIn</a></li>` : ''}
        ${user.portfolioLinks.website ? `<li><a href="${user.portfolioLinks.website}" target="_blank">Personal Website</a></li>` : ''}
      </ul>
    </div>
  </body>
</html>
`;

const temp3 = `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        color: #333;
        line-height: 1.6;
        background-color: #f9f9f9;
        margin: 20px;
        padding: 20px;
      }
      h1 {
        font-size: 28px;
        color: #2c3e50;
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 3px solid #3498db;
        display: inline-block;
        padding: 10px;
      }
      .section {
        background: white;
        border: 2px solid #ecf0f1;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 25px;
      }
      .section h2 {
        font-size: 22px;
        color: #2980b9;
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 2px solid #bdc3c7;
      }
      .section p {
        margin: 8px 0;
        font-size: 16px;
      }
      .label {
        font-weight: bold;
        color: #34495e;
        margin-right: 5px;
      }
      .value {
        color: #7f8c8d;
      }
      .skills, .portfolio {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .skills li, .portfolio li {
        margin: 5px 0;
        padding: 10px;
        background-color: #f1f1f1;
        border-radius: 5px;
        border: 1px solid #ecf0f1;
        font-size: 15px;
      }
      .skills li {
        color: #16a085;
      }
      .portfolio li a {
        color: #3498db;
        text-decoration: none;
        transition: color 0.3s ease;
      }
      .portfolio li a:hover {
        color: #2c3e50;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>Resume</h1>
    <div class="section">
      <h2>Personal Information</h2>
      <p><span class="label">Name:</span> <span class="value">${user.name}</span></p>
      <p><span class="label">Email:</span> <span class="value">${user.email}</span></p>
      <p><span class="label">Contact:</span> <span class="value">${user.contact || 'Not available'}</span></p>
      <p><span class="label">Location:</span> <span class="value">${user.location || 'Not available'}</span></p>
      <p><span class="label">Role:</span> <span class="value">${user.role}</span></p>
    </div>

    <div class="section">
      <h2>Education</h2>
      ${user.education.map(edu => `
        <p><span class="label">Institution:</span> <span class="value">${edu.institution}</span></p>
        <p><span class="label">Degree:</span> <span class="value">${edu.degree}</span></p>
        <p><span class="label">Field of Study:</span> <span class="value">${edu.fieldOfStudy}</span></p>
        <p><span class="label">Start Date:</span> <span class="value">${edu.startDate ? new Date(edu.startDate).toLocaleDateString() : 'Not available'}</span></p>
        <p><span class="label">End Date:</span> <span class="value">${edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Not available'}</span></p>
      `).join('')}
    </div>

    <div class="section">
      <h2>Work Experience</h2>
      ${user.workExperience.map(work => `
        <p><span class="label">Company:</span> <span class="value">${work.company}</span></p>
        <p><span class="label">Position:</span> <span class="value">${work.position}</span></p>
        <p><span class="label">Start Date:</span> <span class="value">${work.startDate ? new Date(work.startDate).toLocaleDateString() : 'Not available'}</span></p>
        <p><span class="label">End Date:</span> <span class="value">${work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Not available'}</span></p>
        <p><span class="label">Description:</span> <span class="value">${work.description || 'Not available'}</span></p>
      `).join('')}
    </div>

    <div class="section">
      <h2>Skills</h2>
      <ul class="skills">
        ${user.skills.map(skill => `<li>${skill}</li>`).join('')}
      </ul>
    </div>

    <div class="section">
      <h2>Certifications</h2>
      <ul class="skills">
        ${user.certifications.map(cert => `<li>${cert}</li>`).join('')}
      </ul>
    </div>

    <div class="section">
      <h2>Portfolio</h2>
      <ul class="portfolio">
        ${user.portfolioLinks.github ? `<li><a href="${user.portfolioLinks.github}">GitHub</a></li>` : ''}
        ${user.portfolioLinks.linkedin ? `<li><a href="${user.portfolioLinks.linkedin}">LinkedIn</a></li>` : ''}
        ${user.portfolioLinks.website ? `<li><a href="${user.portfolioLinks.website}">Personal Website</a></li>` : ''}
      </ul>
    </div>
  </body>
</html>
`;
const temp4 = `
<html>
  <head>
    <style>
      /* General Styling */
      body {
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(90deg, #e3fdfd, #ffe6fa);
        color: #444;
        margin: 0;
        padding: 20px;
        line-height: 1.6;
      }

      h1 {
        font-size: 28px;
        text-align: center;
        color: #222;
        margin-bottom: 20px;
      }

      .container {
        max-width: 900px;
        margin: auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        padding: 25px;
        overflow: hidden;
      }

      .section {
        margin-bottom: 25px;
        border-bottom: 2px solid #dee2e6;
        padding-bottom: 15px;
      }

      .section h2 {
        color: #0078d7;
        font-size: 22px;
        margin-bottom: 10px;
        text-transform: uppercase;
      }

      .section p {
        font-size: 16px;
      }

      .label {
        font-weight: 600;
        color: #333;
        margin-right: 5px;
      }

      .value {
        color: #555;
        font-weight: 400;
      }

      .list {
        padding: 0;
        list-style: none;
      }

      .list li {
        font-size: 15px;
        background: #f8f9fa;
        margin: 5px 0;
        padding: 8px 12px;
        border-left: 5px solid #0078d7;
        border-radius: 5px;
      }

      .list a {
        color: #0078d7;
        text-decoration: none;
        font-weight: 500;
      }

      .list a:hover {
        text-decoration: underline;
      }

      /* Enhancements */
      .highlight {
        background-color: #f1f3f5;
        padding: 6px 8px;
        border-radius: 5px;
        display: inline-block;
      }

      .skills, .certifications, .portfolio {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
        padding: 0;
        list-style-type: none;
      }

      .skills li, .certifications li, .portfolio li {
        text-align: center;
        background: #eef4f7;
        border-radius: 10px;
        padding: 10px;
        transition: transform 0.2s, background-color 0.2s;
        font-size: 14px;
        font-weight: 500;
      }

      .skills li:hover,
      .certifications li:hover,
      .portfolio li:hover {
        transform: translateY(-5px);
        background: #d6f0f3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Resume</h1>

      <div class="section">
        <h2>Personal Information</h2>
        <p><span class="label">Name:</span> <span class="value">${user.name}</span></p>
        <p><span class="label">Email:</span> <span class="value">${user.email}</span></p>
        <p><span class="label">Contact:</span> <span class="value">${user.contact || 'Not available'}</span></p>
        <p><span class="label">Location:</span> <span class="value">${user.location || 'Not available'}</span></p>
        <p><span class="label">Role:</span> <span class="value">${user.role}</span></p>
      </div>

      <div class="section">
        <h2>Education</h2>
        ${user.education.map(edu => `
          <p><span class="label">Institution:</span> <span class="value">${edu.institution}</span></p>
          <p><span class="label">Degree:</span> <span class="value">${edu.degree}</span></p>
          <p><span class="label">Field of Study:</span> <span class="value">${edu.fieldOfStudy}</span></p>
          <p><span class="label">Start Date:</span> <span class="value">${edu.startDate ? new Date(edu.startDate).toLocaleDateString() : 'Not available'}</span></p>
          <p><span class="label">End Date:</span> <span class="value">${edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Not available'}</span></p>
        `).join('')}
      </div>

      <div class="section">
        <h2>Work Experience</h2>
        ${user.workExperience.map(work => `
          <p><span class="label">Company:</span> <span class="value">${work.company}</span></p>
          <p><span class="label">Position:</span> <span class="value">${work.position}</span></p>
          <p><span class="label">Start Date:</span> <span class="value">${work.startDate ? new Date(work.startDate).toLocaleDateString() : 'Not available'}</span></p>
          <p><span class="label">End Date:</span> <span class="value">${work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Not available'}</span></p>
          <p><span class="label">Description:</span> <span class="value">${work.description || 'Not available'}</span></p>
        `).join('')}
      </div>

      <div class="section">
        <h2>Skills</h2>
        <ul class="skills">
          ${user.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
      </div>

      <div class="section">
        <h2>Certifications</h2>
        <ul class="certifications">
          ${user.certifications.map(cert => `<li>${cert}</li>`).join('')}
        </ul>
      </div>

      <div class="section">
        <h2>Portfolio</h2>
        <ul class="portfolio">
          ${user.portfolioLinks.github ? `<li><a href="${user.portfolioLinks.github}">GitHub</a></li>` : ''}
          ${user.portfolioLinks.linkedin ? `<li><a href="${user.portfolioLinks.linkedin}">LinkedIn</a></li>` : ''}
          ${user.portfolioLinks.website ? `<li><a href="${user.portfolioLinks.website}">Personal Website</a></li>` : ''}
        </ul>
      </div>
    </div>
  </body>
</html>
`;

const temp5 = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 40px;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .section {
            margin-bottom: 30px;
          }
          .section h2 {
            font-size: 20px;
            color: #4A90E2;
            border-bottom: 2px solid #4A90E2;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .section p {
            font-size: 16px;
            margin: 5px 0;
          }
          .section strong {
            color: #333;
          }
          .skills, .portfolio {
            list-style-type: none;
            padding: 0;
          }
          .skills li, .portfolio li {
            background: #e0f7fa;
            margin: 5px 0;
            padding: 8px 12px;
            border-radius: 5px;
          }
          .portfolio a {
            color:rgb(109, 2, 209);
            text-decoration: none;
          }
          .portfolio a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="section">
            <h2>Personal Details</h2>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Contact:</strong> ${user.contact || 'Not available'}</p>
            <p><strong>Location:</strong> ${user.location || 'Not available'}</p>
            <p><strong>Role:</strong> ${user.role}</p>
          </div>
    
          <div class="section">
            <h2>Education</h2>
            ${user.education.map(edu => `
              <p><strong>Institution:</strong> ${edu.institution}</p>
              <p><strong>Degree:</strong> ${edu.degree}</p>
              <p><strong>Field of Study:</strong> ${edu.fieldOfStudy}</p>
              <p><strong>Start Date:</strong> ${edu.startDate ? new Date(edu.startDate).toLocaleDateString() : 'Not available'}</p>
              <p><strong>End Date:</strong> ${edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Not available'}</p>
            `).join('')}
          </div>
    
          <div class="section">
            <h2>Work Experience</h2>
            ${user.workExperience.map(work => `
              <p><strong>Company:</strong> ${work.company}</p>
              <p><strong>Position:</strong> ${work.position}</p>
              <p><strong>Start Date:</strong> ${work.startDate ? new Date(work.startDate).toLocaleDateString() : 'Not available'}</p>
              <p><strong>End Date:</strong> ${work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Not available'}</p>
              <p><strong>Description:</strong> ${work.description || 'Not available'}</p>
            `).join('')}
          </div>
    
          <div class="section">
            <h2>Skills</h2>
            <ul class="skills">
              ${user.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
    
          <div class="section">
            <h2>Certifications</h2>
            <ul class="skills">
              ${user.certifications.map(cert => `<li>${cert}</li>`).join('')}
            </ul>
          </div>
    
          <div class="section">
            <h2>Portfolio</h2>
            <ul class="portfolio">
              ${user.portfolioLinks.github ? `<li><a href="${user.portfolioLinks.github}">GitHub</a></li>` : ''}
              ${user.portfolioLinks.linkedin ? `<li><a href="${user.portfolioLinks.linkedin}">LinkedIn</a></li>` : ''}
              ${user.portfolioLinks.website ? `<li><a href="${user.portfolioLinks.website}">Personal Website</a></li>` : ''}
            </ul>
          </div>
        </div>
      </body>
    </html>
`;
const temp6 = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 40px;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .section {
            margin-bottom: 30px;
          }
          .section h2 {
            font-size: 20px;
            color:rgb(226, 152, 74);
            border-bottom: 2px solid rgb(170, 226, 74);
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .section p {
            font-size: 16px;
            margin: 5px 0;
          }
          .section strong {
            color: #333;
          }
          .skills, .portfolio {
            list-style-type: none;
            padding: 0;
          }
          .skills li, .portfolio li {
            background: #e0f7fa;
            margin: 5px 0;
            padding: 8px 12px;
            border-radius: 5px;
          }
          .portfolio a {
            color:rgb(109, 2, 209);
            text-decoration: none;
          }
          .portfolio a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="section">
            <h2>Personal Details</h2>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Contact:</strong> ${user.contact || 'Not available'}</p>
            <p><strong>Location:</strong> ${user.location || 'Not available'}</p>
            <p><strong>Role:</strong> ${user.role}</p>
          </div>
    
          <div class="section">
            <h2>Education</h2>
            ${user.education.map(edu => `
              <p><strong>Institution:</strong> ${edu.institution}</p>
              <p><strong>Degree:</strong> ${edu.degree}</p>
              <p><strong>Field of Study:</strong> ${edu.fieldOfStudy}</p>
              <p><strong>Start Date:</strong> ${edu.startDate ? new Date(edu.startDate).toLocaleDateString() : 'Not available'}</p>
              <p><strong>End Date:</strong> ${edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Not available'}</p>
            `).join('')}
          </div>
    
          <div class="section">
            <h2>Work Experience</h2>
            ${user.workExperience.map(work => `
              <p><strong>Company:</strong> ${work.company}</p>
              <p><strong>Position:</strong> ${work.position}</p>
              <p><strong>Start Date:</strong> ${work.startDate ? new Date(work.startDate).toLocaleDateString() : 'Not available'}</p>
              <p><strong>End Date:</strong> ${work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Not available'}</p>
              <p><strong>Description:</strong> ${work.description || 'Not available'}</p>
            `).join('')}
          </div>
    
          <div class="section">
            <h2>Skills</h2>
            <ul class="skills">
              ${user.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
    
          <div class="section">
            <h2>Certifications</h2>
            <ul class="skills">
              ${user.certifications.map(cert => `<li>${cert}</li>`).join('')}
            </ul>
          </div>
    
          <div class="section">
            <h2>Portfolio</h2>
            <ul class="portfolio">
              ${user.portfolioLinks.github ? `<li><a href="${user.portfolioLinks.github}">GitHub</a></li>` : ''}
              ${user.portfolioLinks.linkedin ? `<li><a href="${user.portfolioLinks.linkedin}">LinkedIn</a></li>` : ''}
              ${user.portfolioLinks.website ? `<li><a href="${user.portfolioLinks.website}">Personal Website</a></li>` : ''}
            </ul>
          </div>
        </div>
      </body>
    </html>
`;
  
    if (format === 'pdf') {
      // Generate PDF using Puppeteer
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      if(templateId==='template1'){
        await page.setContent(temp1);
      }else if(templateId==='template2'){
        await page.setContent(temp2);
      }else if(templateId==='template3'){
        await page.setContent(temp3);
      }else{
        await page.setContent(temp4);
      }
      const pdf = await page.pdf({ format: 'A4' });
      await browser.close();

      return new NextResponse(pdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="user-details.pdf"',
        },
      });
    } else if (format === 'docx') {
      // Generate DOCX using docx library
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [new TextRun(userContent)],
              }),
            ],
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);

      return new NextResponse(buffer, {
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': 'attachment; filename="user-details.docx"',
        },
      });
    } else {
      // Handle invalid format
      return NextResponse.json({ error: 'Invalid format specified' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
