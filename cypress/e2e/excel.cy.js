describe('convert data to Json', () => 
{ 
  it('read data from xcel', () =>
 { 
  cy.parseXlsx('cypress/fixtures/excelData.xlsx').then((jsonData) => {
    const rowLength = Cypress.$(jsonData[0].data).length

    for (let i = 0; i < rowLength; i++) {
        cy.log('Username: ' + jsonData[0].data[i][0]);
        cy.log('Password: ' + jsonData[0].data[i][1]);
        var arr = [];
        arr.push({ usernameValue: jsonData[0].data[i][0], passwordValue: jsonData[0].data[i][1] })
        
    }
    cy.writeFile("cypress/fixtures/xlsxData.json",JSON.stringify(arr) )
  })
 })
}) 