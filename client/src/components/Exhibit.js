import React, { Component } from 'react';
import './Exhibit.css';
// import CountryName from './CountryName';

class Exhibit extends Component {
  state = {
    name: '',
    country: '',
    price: '',
    approvers: ['']
  };

  handleCahngeName(e) {
    // this.state.approvers = e.target.value;
    this.setState({
      name: e.target.value
    });
  }

  handleCahngePrice(e) {
    // this.state.approvers = e.target.value;
    this.setState({
      price: e.target.value
    });
  }

  handleCahngeCountry(e) {
    // this.state.approvers = e.target.value;
    this.setState({
      country: e.target.value
    });
  }

  handleCahngeApprovers(e) {
    // this.state.approvers = e.target.value;
    this.setState({
      approvers: e.target.value
    });
  }

  render() {
    // console.log(this.props.history);
    return (
      <div>
        <div className="exhibit">
          <div className="exhibit_input">
            {/* <Approver /> */}
            <h1 className="title_register">Exhibit</h1>
            <form
              className="exhibit_form"
              onSubmit={e => {
                //formのonSubmitでsubmitを検知してform.elementsから入力値を取得
                e.preventDefault(); //イベントをキャンセル
                const country = this.country.value;
                const name = this.productName.value;
                //[wei] の値をその他の [ether] の単位に変換
                const price = window.web3.utils.toWei(
                  this.productPrice.value.toString(),
                  'Ether'
                );
                // const approver = this.productApprover.value;
                const approver = '0x6a32BB6BC20237D51F2C7cb86a3d1bca4A340693';
                const tokenURI = this.props.ipfsHash;
                this.props.createProduct(
                  country,
                  name,
                  price,
                  approver,
                  tokenURI
                );
              }}
            >
              {/* 名前登録 */}
              <div>
                <input
                  type="text"
                  ref={input => {
                    this.productName = input;
                  }}
                  className="input"
                  placeholder="Name"
                  // placeholder="ProductName"
                  required
                  onChange={e => this.handleCahngeName(e)}
                />
              </div>
              {/* 画像登録 */}
              <div className="image_register">
                {/* 画像選択 */}
                <div className="image_button">
                  <label>
                    <div className="virtual">Choose Image</div>
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      onChange={this.props.captureFile}
                      className="file_choose"
                    />
                  </label>
                </div>
                {/* 画像アップロード */}
                <div className="image_button">
                  <button
                    type="button"
                    onClick={this.props.fileUpload}
                    className="file_upload"
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div>
                <img
                  src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`}
                  alt=""
                  width="250"
                  height="200"
                  className="image"
                />
                {this.props.ipfsHash ? (
                  <div className="test02"></div>
                ) : (
                  <img
                    src={`https://ipfs.io/ipfs/${this.props.ipfsHash}`}
                    alt=""
                    width="250"
                    height="200"
                    className="image"
                  />
                )}
              </div>
              {/* 国登録 */}
              <div>
                {/* <span className="">From</span> */}
                <select
                  ref={select => {
                    this.country = select;
                  }}
                  name="country"
                  className="input"
                  required
                  onChange={e => this.handleCahngeCountry(e)}
                >
                  {/* <select
              ref={select => {
                this.country = select;
              }}
              name="country"
              className="input"
              required
            > */}
                  {/* <option value="select country" selected>
                select country
              </option> */}
                  <option value="select">Your Country</option>
                  <option value="Japan">Japan</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Antigua and Barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
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
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegovina">
                    Bosnia and Herzegovina
                  </option>
                  <option value="Botswana">Botswana</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Brazil Darussalam">Brazil Darussalam</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Central African Republic">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Korea">Korea</option>
                  <option value="Congo">Congo</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="European Community">European Community</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Greece">Greece</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Holy See">Holy See</option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran">Iran</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao">Lao People's Democratic Republic</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan">Libyan Arab Jamahiriya</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia">Micronesia</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Republic of Kosovo">Republic of Kosovo</option>
                  <option value="Republic of Moldova">
                    Republic of Moldova
                  </option>
                  <option value="Romania">Romania</option>
                  <option value="Russian Federation">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Kitts">Saint Kitts and Nevis</option>
                  <option value="Saint Lucia">Saint Lucia</option>
                  <option value="Saint Vincent">
                    Saint Vincent and the Grenadines
                  </option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome">Sao Tome and Principe</option>
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
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syrian Arab ">Syrian Arab Republic</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Thailand">Thailand</option>
                  <option value="The former">
                    The former Yugoslav Republic of Macedonia
                  </option>
                  <option value="The former">The former-Leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad">Trinidad and Tobago</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Tanzania">United Republic of Tanzania</option>
                  <option value="USA">United States of America</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>
              {/* 価格登録 */}
              <div>
                <input
                  type="text"
                  ref={input => {
                    this.productPrice = input;
                  }}
                  placeholder="¥ (ETH)"
                  step="0.01"
                  className="input"
                  required
                  onChange={e => this.handleCahngePrice(e)}
                />
              </div>
              {/* 承認者登録 */}
              <p></p>
              <button type="submit" className="exhibit_button">
                Exhibit
              </button>
            </form>
          </div>
        </div>
        {/* 証明書デモ */}
        <div className="exhibit">
          <div className="certificate_demo">
            <h1 className="certificate_demo_title">Certification</h1>
            <div className="certificate_info_context">
              <p className="certificate_info">{this.props.account} </p>
              <span> exhibit this product.</span> &ensp;
              <br />
              <p></p>
              <span>The name of product is </span>
              <span className="certificate_info">{this.state.name}</span>
              <span> . </span>
              <br />
              <p></p>
              <span> The country of product is </span>
              <span className="certificate_info">{this.state.country} </span>
              <span> . </span>
              <br />
              <p></p>
              <span> The price is </span>
              <span className="certificate_info">{this.state.price} </span>
              <span> ETH . </span>
              <br />
              <p></p>
              <span>Approver is </span>
              <p className="certificate_info">
                {'0xE902E913a037d517Fd7a4d2A09A04673eb09DD3C'}
              </p>
              {/* <span> . </span> */}
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Exhibit;
