import { MdLockOutline } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { SlBriefcase } from "react-icons/sl";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utilities/toastifySetup";
import {registerEmployee} from '../../axiosFolder/axiosFunctions/hrApi/hrApi'

export default function NewEmployeePage() {
  const [activeTab, setActiveTab] = useState(1);

  const [selectedDays, setSelectedDays] = useState([]);

  const [loading, setLoading] = useState(false);

  const [newEmployee, setNewEmployee] = useState({});

  const navigate = useNavigate();

  const handleChangeTab = (newActiveTab) => {
    setActiveTab(newActiveTab);
  };
  const nextTab = () => {
    setActiveTab(activeTab + 1);
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    const { files } = event.currentTarget;
    const file = files && files[0];
    if (file) {
      formik.setFieldValue("image", file);
    }
  };

  const handleWorkingDaysChange = (event) => {
    const { value, checked } = event.target;
    setSelectedDays((prevSelectedDays) => {
      if (checked) {
        return [...prevSelectedDays, value];
      } else {
        return prevSelectedDays.filter((day) => day !== value);
      }
    });
    if (formik) {
      formik.setFieldValue("workingDays", selectedDays);
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: "", //
      lastName: "", //
      mobileNumber: "", //
      email: "", //
      maritalStatus: "", //
      nationality: "", //
      employeeType: "", //
      department: "", //
      designation: "", //
      workingDays: [], //
      officeLocation: "",
      twitterId: "", //
      slackId: "", //
      skypeId: "", //
      githubId: "", //
      dateOfBirth: "", //
      gender: "",  //
      address: "",  //
      city: "", //
      district: "",
      zipCode: "", //
      image: "", //
      bankBranch: "", //
      accountName: "", //
      accountNumber: "", //
      contractType: "", //
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let newForm = new FormData();
        newForm.append("firstName", values.firstName)
        newForm.append("image", values.image)
        newForm.append("lastName", values.lastName)
        newForm.append("gender", values.gender)
        newForm.append("phone", values.mobileNumber)
        newForm.append("email", values.email)
        newForm.append("officeLocation", values.officeLocation)
        newForm.append("birthDate", values.dateOfBirth)
        newForm.append("maritalStatus", values.maritalStatus)
        newForm.append("nationality", values.nationality)
        newForm.append("homeAddress", values.address)
        newForm.append("city", values.city)
        newForm.append("district", values.district)
        newForm.append("zipCode", values.zipCode)
        newForm.append("department", values.department)
        newForm.append("designation", values.designation)
        newForm.append("employeeType", values.employeeType)
        newForm.append("contractType", values.contractType)
        newForm.append("workingDays", JSON.stringify(values.workingDays))
        newForm.append("slackId", values.slackId)
        newForm.append("twitterId", values.twitterId)
        newForm.append("skypeId", values.skypeId)
        newForm.append("githubId", values.githubId)
        newForm.append("bankBranch", values.bankBranch)
        newForm.append("bankAccountNumber", values.accountNumber)
        newForm.append("accountName", values.accountName)

        const data = await registerEmployee(newForm);

        if (data.status !== 200) {
          setLoading(false);
          return showErrorToast(data.data.message);
        }

        setNewEmployee(data.data.employee)

        showSuccessToast(data.data.message);

        formik.resetForm()

        setLoading(false);

        return navigate(`/employee/${data.data.employee._id}`);
        
      }catch (error) {
        console.log(error);
          setLoading(false);
      } finally {
        // formik.setFieldValue("image", "");
        // formik.resetForm()
        setLoading(false);
      }
    },
  });
  return (
    <>
      <div className="mx-1 mt-7 md:max-w-screen-lg md:ml-72 md:mr-5">
        <div className="border rounded-lg border-gray-300">
          <div className="mx-4 md:mt-5">
            {/*Employee Navigation Tabs - Make into Independent Component */}
            <div>
              <ul className="flex flex-nowrap items-center space-x-8 overflow-x-auto pb-4 snap-x snap-mandatory">
                <li
                  onClick={() => handleChangeTab(1)}
                  className={`${
                    activeTab === 1 ? "pb-1 border-b-2 border-b-[#7152f3]" : ""
                  }
          font-lexend whitespace-nowrap hover:border-0 cursor-pointer snap-center snap-always`}
                >
                  <IoMdPerson
                    className={`${
                      activeTab === 1 ? "text-[#7152f3]" : "text-gray-500"
                    } inline-flex items-center mr-3 text-2xl`}
                  />
                  <span
                    className={`${
                      activeTab === 1 ? "text-[#7152f3]" : "text-gray-500"
                    } text-sm font-semibold`}
                  >
                    Personal Information
                  </span>
                </li>
                <li
                  className={`${
                    activeTab === 2 ? "pb-1 border-b-2 border-b-[#7152f3]" : ""
                  }
          font-lexend whitespace-nowrap hover:border-0 cursor-pointer snap-center snap-always`}
                  onClick={() => handleChangeTab(2)}
                >
                  <SlBriefcase
                    className={`${
                      activeTab === 2 ? "text-[#7152f3]" : "text-gray-500"
                    } inline-flex items-center mr-3 text-2xl`}
                  />
                  <span
                    className={`${
                      activeTab === 2 ? "text-[#7152f3]" : "text-gray-500"
                    } text-sm font-semibold`}
                  >
                    Professional Information
                  </span>
                </li>
                <li
                  role="button"
                  className={`${
                    activeTab === 3 ? "pb-1 border-b-2 border-b-[#7152f3]" : ""
                  }
          font-lexend whitespace-nowrap hover:border-0 cursor-pointer snap-center snap-always`}
                  onClick={() => handleChangeTab(3)}
                >
                  <IoNewspaperOutline
                    className={`${
                      activeTab === 3 ? "text-[#7152f3]" : "text-gray-500"
                    } inline-flex items-center mr-3 text-2xl`}
                  />
                  <span
                    className={`${
                      activeTab === 3 ? "text-[#7152f3]" : "text-gray-500"
                    } text-sm font-semibold`}
                  >
                    Documents
                  </span>
                </li>
                <li
                  className={`${
                    activeTab === 4 ? "pb-1 border-b-2 border-b-[#7152f3]" : ""
                  }
          font-lexend whitespace-nowrap hover:border-0 cursor-pointer snap-center snap-always`}
                  onClick={() => handleChangeTab(4)}
                >
                  <MdLockOutline
                    className={`${
                      activeTab === 4 ? "text-[#7152f3]" : "text-gray-500"
                    } inline-flex items-center mr-3 text-2xl`}
                  />
                  <span
                    className={`${
                      activeTab === 4 ? "text-[#7152f3]" : "text-gray-500"
                    } text-sm font-semibold`}
                  >
                    Social Media/Bank Account Details
                  </span>
                </li>
              </ul>
            </div>
            {/* Separator */}
            <hr className="pt-4" />
            <div className="mb-3 font-bold italic text-sm text-red-800">All Fields Are Required (if there are no values, you can fill 'none')</div>
            {/* Multi Step Interactive Form */}
            <form onSubmit={formik.handleSubmit}>
              {/* Personal Information Form Area */}
              <div className={`${activeTab === 1 ? "block" : "hidden"}`}>
                {/* Grid Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
                  {/* Personal Information Grid One Side */}
                  <div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="number"
                        id="mobileNumber"
                        name="mobileNumber"
                        onChange={formik.handleChange}
                        value={formik.values.mobileNumber}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div className="pb-4 gap-2 flex flex-col">
                      <label className="">Date of Birth</label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        onChange={formik.handleChange}
                        value={formik.values.dateOfBirth}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Date of Birth"
                      />
                    </div>
                    <div className="pb-4">
                      <select
                        id="gender"
                        name="gender"
                        onChange={formik.handleChange}
                        value={formik.values.gender}
                        className="p-2 block w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm
                       focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="" disabled="" selected="" hidden="">
                          Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="district"
                        name="district"
                        onChange={formik.handleChange}
                        value={formik.values.district}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="District"
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                  {/* Personal Information Grid Two Side */}
                  <div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="pb-4">
                      <select
                        id="maritalStatus"
                        name="maritalStatus"
                        onChange={formik.handleChange}
                        value={formik.values.maritalStatus}
                        className="p-2 block w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm
                       focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="" disabled="" selected="" hidden="">
                          Marital Status
                        </option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widow/Widower">Widow/Widower</option>
                      </select>
                    </div>
                    <div className="pb-4">
                      <select
                        id="nationality"
                        name="nationality"
                        onChange={formik.handleChange}
                        value={formik.values.nationality}
                        className="p-2 block w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm
                       focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="" disabled="" selected="" hidden="">
                          Nationality
                        </option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Åland Islands">Åland Islands</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia and Herzegovina">
                          Bosnia and Herzegovina
                        </option>
                        <option value="Botswana">Botswana</option>
                        <option value="Bouvet Island">Bouvet Island</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Territory">
                          British Indian Ocean Territory
                        </option>
                        <option value="Brunei Darussalam">
                          Brunei Darussalam
                        </option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">
                          Central African Republic
                        </option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">
                          Christmas Island
                        </option>
                        <option value="Cocos (Keeling) Islands">
                          Cocos (Keeling) Islands
                        </option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo, The Democratic Republic of The">
                          Congo, The Democratic Republic of The
                        </option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote D'ivoire">Cote D'ivoire</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">
                          Dominican Republic
                        </option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">
                          Equatorial Guinea
                        </option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands (Malvinas)">
                          Falkland Islands (Malvinas)
                        </option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">
                          French Polynesia
                        </option>
                        <option value="French Southern Territories">
                          French Southern Territories
                        </option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guernsey">Guernsey</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-bissau">Guinea-bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Heard Island and Mcdonald Islands">
                          Heard Island and Mcdonald Islands
                        </option>
                        <option value="Holy See (Vatican City State)">
                          Holy See (Vatican City State)
                        </option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran, Islamic Republic of">
                          Iran, Islamic Republic of
                        </option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jersey">Jersey</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea, Democratic People's Republic of">
                          Korea, Democratic People's Republic of
                        </option>
                        <option value="Korea, Republic of">
                          Korea, Republic of
                        </option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao People's Democratic Republic">
                          Lao People's Democratic Republic
                        </option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libyan Arab Jamahiriya">
                          Libyan Arab Jamahiriya
                        </option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macao">Macao</option>
                        <option value="Macedonia, The Former Yugoslav Republic of">
                          Macedonia, The Former Yugoslav Republic of
                        </option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia, Federated States of">
                          Micronesia, Federated States of
                        </option>
                        <option value="Moldova, Republic of">
                          Moldova, Republic of
                        </option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Netherlands Antilles">
                          Netherlands Antilles
                        </option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Northern Mariana Islands">
                          Northern Mariana Islands
                        </option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palestinian Territory, Occupied">
                          Palestinian Territory, Occupied
                        </option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">
                          Papua New Guinea
                        </option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Pitcairn">Pitcairn</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russian Federation">
                          Russian Federation
                        </option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Helena">Saint Helena</option>
                        <option value="Saint Kitts and Nevis">
                          Saint Kitts and Nevis
                        </option>
                        <option value="Saint Lucia">Saint Lucia</option>
                        <option value="Saint Pierre and Miquelon">
                          Saint Pierre and Miquelon
                        </option>
                        <option value="Saint Vincent and The Grenadines">
                          Saint Vincent and The Grenadines
                        </option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">
                          Sao Tome and Principe
                        </option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Georgia and The South Sandwich Islands">
                          South Georgia and The South Sandwich Islands
                        </option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Svalbard and Jan Mayen">
                          Svalbard and Jan Mayen
                        </option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syrian Arab Republic">
                          Syrian Arab Republic
                        </option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania, United Republic of">
                          Tanzania, United Republic of
                        </option>
                        <option value="Thailand">Thailand</option>
                        <option value="Timor-leste">Timor-leste</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">
                          Trinidad and Tobago
                        </option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks and Caicos Islands">
                          Turks and Caicos Islands
                        </option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">
                          United Arab Emirates
                        </option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="United States Minor Outlying Islands">
                          United States Minor Outlying Islands
                        </option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Viet Nam">Viet Nam</option>
                        <option value="Virgin Islands, British">
                          Virgin Islands, British
                        </option>
                        <option value="Virgin Islands, U.S.">
                          Virgin Islands, U.S.
                        </option>
                        <option value="Wallis and Futuna">
                          Wallis and Futuna
                        </option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    </div>

                    <div className="pb-4">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="City"
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="number"
                        id="zipCode"
                        name="zipCode"
                        onChange={formik.handleChange}
                        value={formik.values.zipCode}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                </div>
                {/* Toggle Next Step Buttons */}
                <div className="flex justify-end space-x-3 pb-4">
                  <div>
                    <button
                      onClick={() => navigate("/employees")}
                      type="button"
                      className="py-2 px-4 inline-flex items-center gap-x-2 font-lexend text-sm
                     rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50
                     disabled:pointer-events-none"
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => nextTab()}
                      className="py-2 px-4 inline-flex items-center gap-x-2
                     font-lexend text-sm rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700
                      disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {`${activeTab === 4 ? "Add" : "Next"}`}
                    </button>
                  </div>
                </div>
              </div>
              {/* Professional Information Form Area */}
              <div className={`${activeTab === 2 ? "block" : "hidden"}`}>
                {/* Grid Wrapper */}
                <div className="grid grid-cols-2 gap-x-8">
                  {/* Professional Information Grid One Side */}
                  <div>
                    <div className="pb-4">
                      <select
                        id="employeeType"
                        name="employeeType"
                        onChange={formik.handleChange}
                        value={formik.values.employeeType}
                        className="p-2 block w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm
                       focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="" disabled="" selected="" hidden="">
                          Select Employee Type
                        </option>
                        <option value="Office">Office</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="pb-4">
                      <select
                        id="department"
                        name="department"
                        onChange={formik.handleChange}
                        value={formik.values.department}
                        className="p-2 block w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm
                       focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="" disabled="" selected="" hidden="">
                          Select Department
                        </option>
                        <option value="Design">Design</option>
                        <option value="Development">Development</option>
                        <option value="Sales">Sales</option>
                        <option value="PM">PM</option>
                        <option value="HR">HR</option>
                      </select>
                    </div>
                  </div>
                  {/* Professional Information Grid Two Side */}
                  <div className="">
                  <div className="pb-4">
                      <select
                        id="contractType"
                        name="contractType"
                        onChange={formik.handleChange}
                        value={formik.values.contractType}
                        className="p-2 block w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm
                       focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="" disabled="" selected="" hidden="">
                          Contract Type
                        </option>
                        <option value="Contract">Contract</option>
                        <option value="Full Time">Full Time</option>
                      </select>
                    </div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        onChange={formik.handleChange}
                        value={formik.values.designation}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Enter Designation"
                      />
                    </div>
                  
                  </div>
                </div>
                <div className="flex w-full justify-around p-1">
                      <div>Work Days</div>
                    <div className="pb-4 flex justify-center items-center gap-1 mr-1">
                    <input
                      type="checkbox"
                      id="workingDays_monday"
                      name="workingDays"
                      onChange={handleWorkingDaysChange}
                      checked={selectedDays.includes('Monday')}
                      value="Monday"
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                    />
                    <label htmlFor="workingDays_monday">Monday</label>
                  </div>

                  <div className="pb-4 flex justify-center items-center gap-1 mr-1">
                    <input
                      type="checkbox"
                      id="workingDays_tuesday"
                      name="workingDays"
                      onChange={handleWorkingDaysChange}
                      value="Tuesday"
                      checked={selectedDays.includes('Tuesday')}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                    />
                    <label htmlFor="workingDays_tuesday">Tuesday</label>
                  </div>

                  <div className="pb-4 flex justify-center items-center gap-1 mr-1">
                    <input
                      type="checkbox"
                      id="workingDays_wednesday"
                      name="workingDays"
                      onChange={handleWorkingDaysChange}
                      value="Wednesday"
                      checked={selectedDays.includes('Wednesday')}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                    />
                    <label htmlFor="workingDays_wednesday">Wednesday</label>
                  </div>

                  <div className="pb-4 flex justify-center items-center gap-1 mr-1">
                    <input
                      type="checkbox"
                      id="workingDays_thursday"
                      name="workingDays"
                      onChange={handleWorkingDaysChange}
                      value="Thursday"
                      checked={selectedDays.includes('Thursday')}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                    />
                    <label htmlFor="workingDays_thursday">Thursday</label>
                  </div>
                  <div className="pb-4 flex justify-center items-center gap-1 mr-1">
                    <input
                      type="checkbox"
                      id="workingDays_friday"
                      name="workingDays"
                      onChange={handleWorkingDaysChange}
                      value="Friday"
                      checked={selectedDays.includes('Friday')}
                      className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                    />
                    <label htmlFor="workingDays_friday">Friday</label>
                  </div>
                  </div>
                <div className="pb-4">
                  <select
                    id="officeLocation"
                    name="officeLocation"
                    onChange={formik.handleChange}
                    value={formik.values.officeLocation}
                    className="p-2 block w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm
                       focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="" disabled="" selected="" hidden="">
                      Select Office Location
                    </option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="America">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Greenland">Greenland</option>
                  </select>
                </div>
                {/* Toggle Next Step Buttons */}
                <div className="flex justify-end space-x-3 pb-4">
                  <div>
                    <button
                      onClick={() => navigate("/employees")}
                      type="button"
                      className="py-2 px-4 inline-flex items-center gap-x-2 font-lexend text-sm
                     rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50
                     disabled:pointer-events-none"
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => nextTab()}
                      className="py-2 px-4 inline-flex items-center gap-x-2
                     font-lexend text-sm rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700
                      disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {`${activeTab === 4 ? "Add" : "Next"}`}
                    </button>
                  </div>
                </div>
              </div>
              {/* Documents - Grid Section - For Future Refactoring */}
              <div className={`${activeTab === 3 ? "block" : "hidden"}`}>
                <div className="py-4 flex flex-col justify-center items-center gap-2">
                  <h2 className="text-lg font-medium mb-2">
                    Upload Employee Picture
                  </h2>
                  <input
                    className="text-gray-700 border-2 rounded-lg p-3 w-[50%]"
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
                {/* Toggle Next Step Buttons */}
                <div className="flex justify-end space-x-3 pb-4">
                  <div>
                    <button
                      onClick={() => navigate("/employees")}
                      type="button"
                      className="py-2 px-4 inline-flex items-center gap-x-2 font-lexend text-sm
                     rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50
                     disabled:pointer-events-none"
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => nextTab()}
                      className="py-2 px-4 inline-flex items-center gap-x-2
                     font-lexend text-sm rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700
                      disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {`${activeTab === 4 ? "Add" : "Next"}`}
                    </button>
                  </div>
                </div>
              </div>
              {/* Account Access Form Area */}
              <div className={`${activeTab === 4 ? "block" : "hidden"}`}>
                {/* Grid Wrapper */}
                <div className="grid grid-cols-2 gap-x-8">
                  {/* Account Access Grid One Side */}
                  <div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="skypeId"
                        name="skypeId"
                        onChange={formik.handleChange}
                        value={formik.values.skypeId}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Enter Skype ID"
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="twitterId"
                        name="twitterId"
                        onChange={formik.handleChange}
                        value={formik.values.twitterId}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Enter Twitter ID"
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="bankBranch"
                        name="bankBranch"
                        onChange={formik.handleChange}
                        value={formik.values.bankBranch}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Bank Name"
                      />
                    </div>
                  </div>
                  {/* Account Access Grid Two Side */}
                  <div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="slackId"
                        name="slackId"
                        onChange={formik.handleChange}
                        value={formik.values.slackId}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Enter Slack ID"
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="githubId"
                        name="githubId"
                        onChange={formik.handleChange}
                        value={formik.values.githubId}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Enter Github ID"
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="text"
                        id="accountName"
                        name="accountName"
                        onChange={formik.handleChange}
                        value={formik.values.accountName}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Account Name"
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="number"
                        id="accountNumber"
                        name="accountNumber"
                        onChange={formik.handleChange}
                        value={formik.values.accountNumber}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg
                           focus:ring-blue-500 block w-full p-2"
                        placeholder="Account Number"
                      />
                    </div>
                  </div>
                </div>
                {/* Toggle Next Step Buttons */}
                <div className="flex justify-end space-x-3 pb-4">
                  <div>
                    <button
                      onClick={() => navigate("/employees")}
                      type="button"
                      className="py-2 px-4 inline-flex items-center gap-x-2 font-lexend text-sm
                     rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50
                     disabled:pointer-events-none"
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="py-2 px-4 inline-flex items-center gap-x-2
                     font-lexend text-sm rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700
                      disabled:opacity-50 disabled:pointer-events-none"
                    >
                      { loading ? "Loading..." : "Add Employee"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
