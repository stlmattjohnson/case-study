/// <reference types="cypress" />

describe("Search Stops", () => {
  it("should load the routes page", () => {
    cy.intercept("GET", "https://svc.metrotransit.org/nextripv2/routes", {
      fixture: "routes.json",
    }).as("routes");

    cy.visit("http://localhost:3000/");

    cy.wait("@routes");
  });

  it("should use navigate to the search stops tab", () => {
    cy.get("[data-testid=search-stops-tab]").click();
    cy.get("[data-testid=search-stops-box]").should("be.visible");
  });

  it("should use the filter to search with no results returned", () => {
    cy.get("[data-testid=filter-input]").type("Test");

    cy.intercept("GET", "https://svc.metrotransit.org/nextripv2/Test", {
      statusCode: 400,
    }).as("nextripresultError");

    cy.get("[data-testid=error-alert]").should("be.visible");
  });

  it("should use the filter to search with a valid result returned", () => {
    cy.intercept("GET", "https://svc.metrotransit.org/nextripv2/1", {
      fixture: "nextripresult.json",
    }).as("nextripresult");

    cy.get("[data-testid=filter-clear]").click();
    cy.get("[data-testid=error-alert]").should("not.exist");

    cy.get("[data-testid=filter-input]").type("1");
    cy.get("[data-testid=filter-input]").blur();

    cy.get("[data-testid='departure-0-text']").should("be.visible");
  });
});

export {};
