class PractoHospitalPage {
  visitHospitalsPage() {
    cy.visit('https://www.practo.com/bangalore/hospitals');
    cy.wait(5000);
  }
 
  getHospitalCards() {
    return cy.get('.c-estb-card');
  }
 
  validateTopHospitals() {
    let hospitalNames = [];
    this.getHospitalCards().each(($el) => {
      const rating = parseFloat($el.find('.text-1 .u-bold').text());
      const opening = $el.find('.pd-right-2px-text-green').text();
 
      if (rating > 3.5 && opening === 'Open 24x7') {
        const name = $el.find('.line-1').text();
        hospitalNames.push(name);
      }
    }).then(() => {
      hospitalNames.forEach((name) => cy.log(name));
    });
  }
}
export default new PractoHospitalPage();