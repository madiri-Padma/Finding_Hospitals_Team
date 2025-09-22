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
  visitHomePage() {
    cy.visit('https://www.practo.com');
  }
 
  getTopLocations() {
    cy.contains('Search for hospitals').click();
    cy.contains('Hospitals in Bangalore').click();
    cy.get("input[placeholder='Search location']").click();
 
    let locations = [];
    cy.get('.c-omni-suggestion-group .c-omni-suggestion-item').each(($el) => {
      locations.push($el.text().replace(/bangalore/i, '').trim());
    }).then(() => {
      locations.forEach((loc) => cy.log(loc));
    });
  }
  visitCorporatePage() {
    cy.visit('https://www.practo.com/plus/corporate');
    cy.viewport(1280, 800);
  }
 
  fillInvalidDemoForm() {
    cy.get('form').first().should('be.visible').within(() => {
      cy.get('input[name="name"]').type('John');
      cy.get('input[name="organizationName"]').type('Acme Corp');
      cy.get('input[name="contactNumber"]').type('98765432');
      cy.get('input[placeholder*="Email"]').type('johndoe.example.com');
      cy.get('select[name="organizationSize"]').select(1);
      cy.get('select[name="interestedIn"]').select('Taking a demo');
      cy.get('button[type="submit"]').should('be.disabled');
    });
  }
  validateLinkedInLink() {
  cy.visit('https://www.practo.com/');
  cy.get('a[href*="linkedin.com"]')
    .should('have.attr', 'href')
    .and('include', 'linkedin.com/company/practo');
}

}
export default new PractoHospitalPage();