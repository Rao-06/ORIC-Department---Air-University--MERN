import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import { FaArrowLeft, FaEdit, FaMale, FaFemale, FaTransgender, FaUser, FaUserFriends, FaHeartBroken, FaCalendarAlt, FaCheck, FaPencilAlt, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './PersonalInformation.css';
import defaultAvatar from '../../Assets/profilepic.png';
import airlogo from '../../Assets/airlogo.png';

const maritalOptions = [
  { value: 'single', label: 'Single', icon: <FaUser /> },
  { value: 'married', label: 'Married', icon: <FaUserFriends /> },
  { value: 'divorced', label: 'Divorced', icon: <FaHeartBroken /> },
];
const genderOptions = [
  { value: 'male', label: 'Male', icon: <FaMale /> },
  { value: 'female', label: 'Female', icon: <FaFemale /> },
  { value: 'other', label: 'Other', icon: <FaTransgender /> },
];
// Countries and their cities (extend as needed)
const countryToCities = {
  Pakistan: [
    'Islamabad', 'Ahmed Nager', 'Ahmadpur East', 'Ali Khan', 'Alipur', 'Arifwala', 'Attock', 'Bhera', 'Bhalwal', 'Bahawalnagar', 'Bahawalpur', 'Bhakkar', 'Burewala', 'Chillianwala', 'Chak', 'Chakwal', 'Chichawatni', 'Chiniot', 'Chishtian', 'Daska', 'Darya Khan', 'Dera Ghazi', 'Dhaular', 'Dina', 'Dinga', 'Dipalpur', 'Faisalabad', 'Fateh Jhang', 'Ghakhar Mandi', 'Gojra', 'Gujranwala', 'Gujrat', 'Gujar Khan', 'Hafizabad', 'Haroonabad', 'Hasilpur', 'Haveli', 'Lakha', 'Jalalpur', 'Jattan', 'Jampur', 'Jaranwala', 'Jhang', 'Jhelum', 'Kalabagh', 'Karor Lal', 'Kasur', 'Kamalia', 'Kamoke', 'Khanewal', 'Khanpur', 'Kharian', 'Khushab', 'Kot Adu', 'Jauharabad', 'Lahore', 'Lalamusa', 'Layyah', 'Liaquat Pur', 'Lodhran', 'Malakwal', 'Mamoori', 'Mailsi', 'Mandi Bahauddin', 'mian Channu', 'Mianwali', 'Multan', 'Murree', 'Muridke', 'Mianwali Bangla', 'Muzaffargarh', 'Narowal', 'Okara', 'Renala Khurd', 'Pakpattan', 'Pattoki', 'Pir Mahal', 'Qaimpur', 'Qila Didar', 'Rabwah', 'Raiwind', 'Rajanpur', 'Rahim Yar', 'Rawalpindi', 'Sadiqabad', 'Safdarabad', 'Sahiwal', 'Sangla Hill', 'Sarai Alamgir', 'Sargodha', 'Shakargarh', 'Sheikhupura', 'Sialkot', 'Sohawa', 'Soianwala', 'Siranwali', 'Talagang', 'Taxila', 'Toba Tek', 'Vehari', 'Wah Cantonment', 'Wazirabad', 'Badin', 'Bhirkan', 'Rajo Khanani', 'Dadu', 'Digri', 'Diplo', 'Dokri', 'Ghotki', 'Haala', 'Hyderabad', 'Islamkot', 'Jacobabad', 'Jamshoro', 'Jungshahi', 'Kandhkot', 'Kandiaro', 'Karachi', 'Kashmore', 'Keti Bandar', 'Khairpur', 'Kotri', 'Larkana', 'Matiari', 'Mehar', 'Mirpur Khas', 'Mithani', 'Mithi', 'Mehrabpur', 'Moro', 'Nagarparkar', 'Naudero', 'Naushahro Feroze', 'Naushara', 'Nawabshah', 'Nazimabad', 'Qambar', 'Qasimabad', 'Ranipur', 'Ratodero', 'Rohri', 'Sakrand', 'Sanghar', 'Shahbandar', 'Shahdadkot', 'Shahdadpur', 'Shahpur Chakar', 'Shikarpaur', 'Sukkur', 'Tangwani', 'Tando Adam', 'Tando Allahyar', 'Tando Muhammad', 'Thatta', 'Umerkot', 'Warah', 'Abbottabad', 'Adezai', 'Alpuri', 'Akora Khattak', 'Ayubia', 'Banda Daud', 'Bannu', 'Batkhela', 'Battagram', 'Birote', 'Chakdara', 'Charsadda', 'Chitral', 'Daggar', 'Dargai', 'dera Ismail', 'Doaba', 'Dir', 'Drosh', 'Hangu', 'Haripur', 'Karak', 'Kohat', 'Kulachi', 'Lakki Marwat', 'Latamber', 'Madyan', 'Mansehra', 'Mardan', 'Mastuj', 'Mingora', 'Nowshera', 'Paharpur', 'Pabbi', 'Peshawar', 'Saidu Sharif', 'Shorkot', 'Shewa Adda', 'Swabi', 'Swat', 'Tangi', 'Tank', 'Thall', 'Timergara', 'Tordher', 'Awaran', 'Barkhan', 'Chagai', 'Dera Bugti', 'Gwadar', 'Harnai', 'Jafarabad', 'Jhal Magsi', 'Kacchi', 'Kalat', 'Kech', 'Kharan', 'Khuzdar', 'Killa Abdullah', 'Killa Saifullah', 'Kohlu', 'Lasbela', 'Lehri', 'Loralai', 'Mastung', 'Musakhel', 'Nasirabad', 'Nushki', 'Panjgur', 'Pishin valley', 'Quetta', 'Sherani', 'Sibi', 'Sohbatpur', 'Washuk', 'Zhob', 'Ziarat'
  ],
  India: ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata'],
  USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'San Francisco', 'Seattle'],
  UK: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool'],
};
const countryList = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"United States of America (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];

const titleOptions = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Dr', label: 'Dr' },
  { value: 'Engr', label: 'Engr' },
  { value: 'Prof', label: 'Prof' },
  { value: 'PhD', label: 'PhD' },
  { value: 'Engr. Dr', label: 'Engr. Dr' },
  { value: 'Prof. Dr', label: 'Prof. Dr' },
];

const requiredFields = [
  'title', 'firstName', 'lastName', 'dob', 'fatherName',
  'permanentAddress', 'permanentCountry', 'permanentCity',
  'mailingAddress', 'mailingCountry', 'mailingCity'
];

const PersonalInformation = () => {
  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsPageLoading(false), 900);
    return () => clearTimeout(t);
  }, []);
  const [profilePic, setProfilePic] = useState(null);
  const titleValidityRef = useRef(null);
  const [formData, setFormData] = useState({
    title: 'Mr',
    firstName: '',
    middleName: '',
    lastName: '',
    fatherName: '',
    dob: '',
    maritalStatus: '',
    gender: '',
    permanentAddress: '',
    permanentCountry: '',
    permanentCity: '',
    mailingAddress: '',
    mailingCountry: '',
    mailingCity: '',
    sameAsPermanent: false,
    cnic: '',
    nationality: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'sameAsPermanent' && checked
        ? {
            mailingAddress: prev.permanentAddress,
            mailingCountry: prev.permanentCountry,
            mailingCity: prev.permanentCity,
          }
        : {}),
      ...(name === 'permanentCountry'
        ? { permanentCity: isCityValid(prev.permanentCity, value) ? prev.permanentCity : '' }
        : {}),
      ...(name === 'mailingCountry'
        ? { mailingCity: isCityValid(prev.mailingCity, value) ? prev.mailingCity : '' }
        : {}),
      ...(prev.sameAsPermanent && (name === 'permanentAddress' || name === 'permanentCountry' || name === 'permanentCity')
        ? {
            mailingAddress: name === 'permanentAddress' ? value : (name === 'permanentCountry' ? prev.mailingAddress : prev.mailingAddress),
            mailingCountry: name === 'permanentCountry' ? value : prev.mailingCountry,
            mailingCity: name === 'permanentCity' ? value : prev.mailingCity,
          }
        : {}),
    }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleMaritalStatus = (value) => setFormData((prev) => ({ ...prev, maritalStatus: value }));
  const handleGender = (value) => setFormData((prev) => ({ ...prev, gender: value }));

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });
    return newErrors;
  };

  // Load existing personal info on mount
  React.useEffect(() => {
    (async () => {
      try {
        const res = await httpRequest('/research/personal');
        if (res?.data) {
          const data = res.data;
          setFormData((prev) => ({
            ...prev,
            title: data.title || '',
            firstName: data.firstName || '',
            middleName: data.middleName || '',
            lastName: data.lastName || '',
            fatherName: data.fatherName || '',
            dob: data.dob ? String(data.dob).substring(0, 10) : '',
            maritalStatus: data.maritalStatus || '',
            gender: data.gender || '',
            permanentAddress: data.permanentAddress || '',
            permanentCountry: data.permanentCountry || '',
            permanentCity: data.permanentCity || '',
            mailingAddress: data.mailingAddress || '',
            mailingCountry: data.mailingCountry || '',
            mailingCity: data.mailingCity || '',
          }));
          return; // already loaded from saved personal info
        }
      } catch (err) {
        // Ignore and try to prefill from user profile
      }
      try {
        const prof = await httpRequest('/users/profile');
        const user = prof?.data?.user;
        if (user) {
          const parts = String(user.name || '').trim().split(/\s+/);
          const [firstName, ...rest] = parts;
          const lastName = rest.join(' ');
          const defaultCountry = 'Pakistan';
          const cityCandidate = user.city && isCityValid(user.city, defaultCountry) ? user.city : '';
          setFormData((prev) => ({
            ...prev,
            firstName: prev.firstName || firstName || '',
            lastName: prev.lastName || lastName || '',
            permanentCountry: prev.permanentCountry || (cityCandidate ? defaultCountry : prev.permanentCountry),
            mailingCountry: prev.mailingCountry || (cityCandidate ? defaultCountry : prev.mailingCountry),
            permanentCity: prev.permanentCity || cityCandidate,
            mailingCity: prev.mailingCity || cityCandidate,
            cnic: user.cnic || prev.cnic,
            nationality: prev.nationality || 'Pakistan',
          }));
        }
      } catch (e) {
        // no-op if profile not available
      }
    })();
  }, []);

  const savePersonalInfo = async () => {
    setApiError('');
    setApiSuccess('');
    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        firstName: formData.firstName,
        middleName: formData.middleName || '',
        lastName: formData.lastName,
        fatherName: formData.fatherName,
        dob: formData.dob,
        maritalStatus: formData.maritalStatus,
        gender: formData.gender,
        permanentAddress: formData.permanentAddress,
        permanentCountry: formData.permanentCountry,
        permanentCity: formData.permanentCity,
        mailingAddress: formData.mailingAddress,
        mailingCountry: formData.mailingCountry,
        mailingCity: formData.mailingCity,
        sameAsPermanent: !!formData.sameAsPermanent,
        cnic: formData.cnic,
        nationality: formData.nationality || 'Pakistan',
      };
      const res = await httpRequest('/research/personal', { method: 'POST', body: payload });
      setApiSuccess(res?.message || 'Saved');
      return true;
    } catch (err) {
      setApiError(err.message || 'Failed to save');
      if (err.status === 401) {
        navigate('/login');
      }
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      navigate('/educational-information');
    } else {
      if (newErrors.title && titleValidityRef.current) {
        try {
          titleValidityRef.current.setCustomValidity('Please fill in this field.');
          titleValidityRef.current.reportValidity();
        } catch {}
      }
    }
  };

  const handleSaveAndClose = () => {
    savePersonalInfo().then((ok) => {
      if (ok) navigate('/dashboard');
    });
  };

  // Progress tracker logic (only clickable for previous steps)
  const handleStepClick = (stepId) => {
    if (stepId === 1) navigate('/research-grants');
  };
  const steps = [
    { id: 1, title: 'Research Grant', completed: true, path: '/research-grants' },
    { id: 2, title: 'Personal Information', completed: false, active: true, path: '/personal-information' },
    { id: 3, title: 'Educational Information', completed: false, path: '/educational-information' },
    { id: 4, title: 'Employment Information', completed: false, path: '/employment-information' },
    { id: 5, title: 'Research Grant Application Form', completed: false, path: '/research-grant-application' },
  ];

  return (
    <form className="personal-info-form" onSubmit={handleSubmit}>
      {isPageLoading && (
        <div className="full-screen-loader" role="status" aria-live="polite">
          <div className="loader-side left"><span></span><span></span><span></span></div>
          <img src={airlogo} alt="Air University" className="loader-logo" />
          <div className="loader-side right"><span></span><span></span><span></span></div>
        </div>
      )}
      {/* Modern Note and Progress Tracker Card */}
      <div className="progress-tracker-card">
        <div className="important-note modern-note">
          <span className="note-icon"><FaExclamationCircle /></span>
          <span className="note-text">
            <b>Note:</b> Last date of <b>"PERIDOT Research Program"</b> application submission is <span className="deadline">"23/09/25 at 11:59PM"</span>. Saved applications will not be considered after this time.
          </span>
        </div>
        <div className="modern-progress-tracker">
          {steps.map((step, index) => (
            <div key={step.id} className="modern-step-container">
              <div
                className={`step-circle ${step.completed ? 'completed' : step.active ? 'active' : 'inactive'}`}
              >
                {step.completed ? <FaCheck /> : step.id}
              </div>
              <span className={`step-label ${step.active ? 'active' : step.completed ? 'completed' : ''}`}>{step.title}</span>
              {index < steps.length - 1 && <div className="modern-step-connector" />}
            </div>
          ))}
        </div>
      </div>
      {apiError && <div className="alert alert-danger" role="alert">{apiError}</div>}
      {apiSuccess && <div className="alert alert-success" role="alert">{apiSuccess}</div>}
      {/* Personal Info Section */}
      <section className="section personal-section">
        <h2 className="section-title">Personal Info</h2>
        <hr className="section-divider" />
        {/* Profile Picture Centered with Header */}
        <div className="profile-pic-top">
          <div className="profile-pic-card">
            <div className="profile-pic-header">
              <span>Edit Picture</span>
              <FaPencilAlt className="profile-pic-pencil" />
              <input type="file" accept="image/*" style={{ display: 'none' }} id="profilePicInput" onChange={handleProfilePicChange} />
            </div>
            <label htmlFor="profilePicInput" className="profile-pic-label">
              <img
                src={profilePic || defaultAvatar}
                alt="Profile"
                className="profile-pic profile-pic-square"
              />
            </label>
          </div>
        </div>
        {/* Form Fields Layout */}
        <div className="personal-fields">
          <div className="row-3">
            <div className="form-group floating-label-group">
              <Select
                classNamePrefix="react-select"
                options={titleOptions}
                value={titleOptions.find(opt => opt.value === formData.title) || null}
                onChange={option => {
                  handleInputChange({ target: { name: 'title', value: option ? option.value : '' } });
                  if (titleValidityRef.current) {
                    try { titleValidityRef.current.setCustomValidity(''); } catch {}
                  }
                }}
                placeholder=" "
                isSearchable
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: errors.title && submitted ? '#e53935' : state.isFocused ? '#00b068' : '#2a2c30',
                    boxShadow: state.isFocused ? '0 0 0 3px rgba(0,176,104,0.08)' : base.boxShadow,
                    minHeight: '48px',
                    fontSize: '16px',
                  }),
                  placeholder: base => ({ ...base, color: '#888', fontSize: '15px' }),
                }}
                isClearable
              />
              {/* Hidden input to trigger native required tooltip for title */}
              <input
                ref={titleValidityRef}
                value={formData.title}
                onChange={() => {}}
                required
                style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }}
              />
              <label className={formData.title ? 'float' : ''}></label>
              {errors.title && submitted && <span className="error-message">{errors.title}</span>}
            </div>
            <div className="form-group floating-label-group">
              <input name="firstName" value={formData.firstName} placeholder='First Name' onChange={handleInputChange} required className={formData.firstName ? 'has-value' : ''} />
              <label className={formData.firstName ? 'float' : ''}></label>
              {errors.firstName && submitted && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group floating-label-group">
              <input name="middleName" value={formData.middleName} placeholder='Middle Name' onChange={handleInputChange} className={formData.middleName ? 'has-value' : ''} />
              <label className={formData.middleName ? 'float' : ''}></label>
            </div>
          </div>
          <div className="row-3">
            <div className="form-group">
              <input name="lastName" value={formData.lastName} placeholder='Last Name' onChange={handleInputChange} required style={{marginTop: '35px'}} />
              {errors.lastName && submitted && <span className="error-message">{errors.lastName}</span>}
            </div>
            <div className="form-group">
              <label className="small-label">Marital Status</label>
              <div className="icon-group">
                {maritalOptions.map(opt => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`icon-btn${formData.maritalStatus === opt.value ? ' selected' : ''}`}
                    onClick={() => handleMaritalStatus(opt.value)}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="small-label">Gender</label>
              <div className="icon-group">
                {genderOptions.map(opt => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`icon-btn${formData.gender === opt.value ? ' selected' : ''}`}
                    onClick={() => handleGender(opt.value)}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="row-2">
            <div className="form-group floating-label-group">
              <input type="date" name="dob" value={formData.dob} placeholder='Date of Birth' onChange={handleInputChange} required className={formData.dob ? 'has-value' : ''} />
              <label className={formData.dob ? 'float' : ''}></label>
              {errors.dob && submitted && <span className="error-message">{errors.dob}</span>}
            </div>
            <div className="form-group floating-label-group">
              <input name="fatherName" value={formData.fatherName} placeholder='Father Name' onChange={handleInputChange} required className={formData.fatherName ? 'has-value' : ''} />
              <label className={formData.fatherName ? 'float' : ''}></label>
              {errors.fatherName && submitted && <span className="error-message">{errors.fatherName}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section contact-section">
        <h2 className="section-title">Contact Info</h2>
        <div className="address-block">
          <h3>Permanent Address</h3>
          <div className="row-1">
            <div className="form-group full-width floating-label-group">
              <input name="permanentAddress" placeholder='Address' value={formData.permanentAddress} onChange={handleInputChange} required className={formData.permanentAddress ? 'has-value' : ''} />
              <label className={formData.permanentAddress ? 'float' : ''}></label>
              {errors.permanentAddress && submitted && <span className="error-message">{errors.permanentAddress}</span>}
            </div>
          </div>
          <div className="row-2">
            <div className="form-group floating-label-group">
              <select name="permanentCountry" value={formData.permanentCountry} onChange={handleInputChange} required className={formData.permanentCountry ? 'has-value' : ''}>
                <option value="">Country</option>
                {countryList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className={formData.permanentCountry ? 'float' : ''}></label>
              {errors.permanentCountry && submitted && <span className="error-message">{errors.permanentCountry}</span>}
            </div>
            <div className="form-group floating-label-group">
              <select name="permanentCity" value={formData.permanentCity} onChange={handleInputChange} required className={formData.permanentCity ? 'has-value' : ''}>
                <option value="">City</option>
                {getCities(formData.permanentCountry).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className={formData.permanentCity ? 'float' : ''}></label>
              {errors.permanentCity && submitted && <span className="error-message">{errors.permanentCity}</span>}
            </div>
          </div>
        </div>
        <div className="address-block">
          <h3>Mailing Address</h3>
          <div className="row-1">
            <label className="checkbox-label">
              <input type="checkbox" name="sameAsPermanent" checked={formData.sameAsPermanent} onChange={handleInputChange} />
              Same as Permanent Address
            </label>
          </div>
          <div className="row-1">
            <div className="form-group full-width floating-label-group">
              <input name="mailingAddress" placeholder='Address' value={formData.mailingAddress} onChange={handleInputChange} required className={formData.mailingAddress ? 'has-value' : ''} />
              <label className={formData.mailingAddress ? 'float' : ''}></label>
              {errors.mailingAddress && submitted && <span className="error-message">{errors.mailingAddress}</span>}
            </div>
          </div>
          <div className="row-2">
            <div className="form-group floating-label-group">
              <select name="mailingCountry" value={formData.mailingCountry} onChange={handleInputChange} required className={formData.mailingCountry ? 'has-value' : ''}>
                <option value="">Country</option>
                {countryList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className={formData.mailingCountry ? 'float' : ''}></label>
              {errors.mailingCountry && submitted && <span className="error-message">{errors.mailingCountry}</span>}
            </div>
            <div className="form-group floating-label-group">
              <select name="mailingCity" value={formData.mailingCity} onChange={handleInputChange} required className={formData.mailingCity ? 'has-value' : ''}>
                <option value="">City</option>
                {getCities(formData.mailingCountry).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className={formData.mailingCity ? 'float' : ''}></label>
              {errors.mailingCity && submitted && <span className="error-message">{errors.mailingCity}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Nationality Info Section */}
      <section className="section nationality-section">
        <h2 className="section-title">Nationality Info</h2>
        <table className="nationality-table">
          <thead>
            <tr>
              <th>IDENTIFICATION</th>
              <th>TYPE</th>
              <th>COUNTRY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formData.cnic}</td>
              <td>CNIC</td>
              <td>{formData.nationality}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Navigation Buttons */}
      <div className="form-navigation nav-bottom">
        <button type="button" className="nav-button prev-button" onClick={() => navigate('/research-grants')}>
          GO BACK
        </button>
       <div style={{display: 'flex', gap: '10px'}}>
        <button type="button" className="nav-button save-button" disabled={saving} onClick={handleSaveAndClose}>
          SAVE & CLOSE
        </button>
        <button type="submit" className="nav-button next-button" disabled={saving}>
          NEXT STEP
        </button>
       </div>
      </div>
    </form>
  );
};

export default PersonalInformation;

