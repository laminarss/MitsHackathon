import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ButtonGroup from '@mui/material/ButtonGroup';
import SaveIcon from '@mui/icons-material/Save';
import SimpleDialogDemo from './EmailButton';
import '../App.css';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {

  const [loadState,setLoadState] = useState(false)
  const [EmailFlag,setEmailFlag] = useState(false)
  const [fileInfo,setFileInfo] = useState(null)
  const data = [
    { first_name: "John", last_name: "Doe", organization: "Google", linkedin_url: "https://linkedin.com/in/johndoe", personal_emails: "john.doe@gmail.com" },
    { first_name: "Alice", last_name: "Smith", organization: "Microsoft", linkedin_url: "https://linkedin.com/in/alicesmith", personal_emails: "alice.smith@outlook.com" },
    { first_name: "Bob", last_name: "Williams", organization: "Apple", linkedin_url: "https://linkedin.com/in/bobwilliams", personal_emails: "bob.williams@apple.com" },
    { first_name: "Charlie", last_name: "Brown", organization: "Amazon", linkedin_url: "https://linkedin.com/in/charliebrown", personal_emails: "charlie.brown@amazon.com" },
    { first_name: "David", last_name: "Miller", organization: "Facebook", linkedin_url: "https://linkedin.com/in/davidmiller", personal_emails: "david.miller@facebook.com" },
    { first_name: "Emily", last_name: "Johnson", organization: "Netflix", linkedin_url: "https://linkedin.com/in/emilyjohnson", personal_emails: "emily.johnson@netflix.com" },
  ];

  return (
    <>
      <div className="file_upload">
        <div className="upload_button">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput type="file" accept='.txt' onChange={event => setFileInfo(event.target.files)} multiple />
          </Button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Organization</th>
                <th>LinkedIn</th>
                <th>Personal Email</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 5).map((person, index) => (
                <tr key={index}>
                  <td>{person.first_name}</td>
                  <td>{person.last_name}</td>
                  <td>{person.organization}</td>
                  <td>
                    <a href={person.linkedin_url} target="_blank" rel="noopener noreferrer">
                      Profile
                    </a>
                  </td>
                  <td>{person.personal_emails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <ButtonGroup variant="outlined" aria-label="Loading button group">
            <Button >Download</Button>
            <Button loading={loadState} loadingPosition="start" startIcon={<SaveIcon />}>
              Upload
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className='send_mail_component'>
        <SimpleDialogDemo fileInfo={fileInfo}/>
      </div>
    </>
  );
}
