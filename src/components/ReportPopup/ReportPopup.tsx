import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GenerateReportModel } from '../../utils/interfaces';

const ReportPopup = ({ isOpen, onClose, onDownloadClick }) => {

  const initialReportModel: GenerateReportModel = {
    dateFrom: undefined,
    dateTo: undefined,
    reportDate: undefined,
    reportType: 0,
  };

  const [reportModel, setReportModel] = useState<GenerateReportModel>(initialReportModel);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setReportModel(initialReportModel);
      setError(null);
    }
  }, [isOpen]);

  const handleDownloadClick = () => {
    if (reportModel.reportType === 4 && reportModel.dateFrom && reportModel.dateTo && reportModel.dateFrom > reportModel.dateTo) {
      setError(" Date From must be less than or equal to Date To");
      return;
    }

    onDownloadClick(reportModel);
    onClose();
  };

  const handleDateFromChange = (newDateFrom) => {
    setReportModel({ ...reportModel, dateFrom: newDateFrom });

    if (reportModel.reportType === 4 && reportModel.dateTo && newDateFrom > reportModel.dateTo) {
      setError(" Date From must be less than or equal to Date To");
    } else {
      setError(null);
    }
  };

  const handleDateToChange = (newDateTo) => {
    setReportModel({ ...reportModel, dateTo: newDateTo });

    if (reportModel.reportType === 4 && reportModel.dateFrom && reportModel.dateFrom > newDateTo) {
      setError(" Date From must be less than or equal to Date To");
    } else {
      setError(null);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, width: 400 }}>
        <Typography variant="h6" component="div" mb={2}>
          Select Report Type
        </Typography>
        <RadioGroup 
          value={reportModel.reportType} 
          onChange={(e) => {
            setReportModel({ ...reportModel, reportType: parseInt(e.target.value), reportDate: undefined, dateFrom: undefined, dateTo: undefined });
            setError(null);
          }} 
        >
          <FormControlLabel value={0} control={<Radio />} label="All Time Report" />
          <FormControlLabel value={1} control={<Radio />} label="Annual Report" />
          <FormControlLabel value={2} control={<Radio />} label="Monthly Report" />
          <FormControlLabel value={3} control={<Radio />} label="Daily Report" />
          <FormControlLabel value={4} control={<Radio />} label="Report For The Period" />
        </RadioGroup>

        <Box style={{ marginTop: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            {reportModel.reportType === 1 && (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker 
                label={'Select Year'} 
                views={['year']}
                value={reportModel.reportDate}
                onChange={(newValue) => setReportModel({ ...reportModel, reportDate: newValue })}
              />
            </LocalizationProvider>
            )}

            {reportModel.reportType === 2 && (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker 
                label={'Select Month and Year'} 
                views={['month', 'year']}
                value={reportModel.reportDate}
                onChange={(newValue) => setReportModel({ ...reportModel, reportDate: newValue })}
              />
            </LocalizationProvider>
            )}

            {reportModel.reportType === 3 && (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Select Date"
                value={reportModel.reportDate}
                onChange={(newDate) => setReportModel({ ...reportModel, reportDate: newDate })}
                format='DD MMMM, YYYY'
              />
            </LocalizationProvider>
            )}

            {reportModel.reportType === 4 && (
              <Box style={{ display: 'flex', gap: '15px' }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Date From"
                    value={reportModel.dateFrom}
                    onChange={handleDateFromChange}
                    format='DD-MM-YYYY'
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Date To"
                    value={reportModel.dateTo}
                    onChange={handleDateToChange}
                    format='DD-MM-YYYY'
                  />
                </LocalizationProvider>
              </Box>
            )}
        </Box>
        <Box style={{ marginBottom: '15px', justifyContent: 'center' }}>
          {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
          )}
        </Box>

        <Button variant="contained" color="primary" onClick={handleDownloadClick} fullWidth disabled={error !== null}>
          Download
        </Button>
      </Box>
    </Modal>
  );
};

export default ReportPopup;
