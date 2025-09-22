import PractoHospitalPage from '../support/pageobject/PractoHospitalPage';
describe('Practo Hospital Feature Tests', () => {
  Cypress.on('uncaught:exception', () => false);
  it('should validate top 10 hospitals with 24x7 availability and rating > 3.5', () => {
    PractoHospitalPage.visitHospitalsPage();
    PractoHospitalPage.validateTopHospitals();
  });
});