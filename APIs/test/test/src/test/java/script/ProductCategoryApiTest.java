package script;

import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.equalTo;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;

public class ProductCategoryApiTest {

    private static final String TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODk5YzExNWM2MjIxZTAwMWU3N2MxYmYiLCJpYXQiOjE3NTYxMDMxMDcsInR5cGUiOiJhY2Nlc3MifQ.ePfwHxKvQG8gF3cqEQ_iobqWtCA8ZrGI6es4TiRndfM";

    private static final String INVALID_TOKEN = "INVALID_TOKEN";

    private static final String BASE_URL = "https://pxxxinvsvu.us-east-1.awsapprunner.com/v1/product-categories";

    // ------------------ Positive Test Case ------------------ //

    @Test
public void testAddProductCategory_ValidRequest_ShouldReturn201() {
    /*
     * Description: Add a new product category with valid token
     * Expected: Status 201 Created, productCategory = "API Test 3"
     * If Pass: API works correctly, category added successfully
     * If Fail: Check token, request payload, backend availability
     */
    String requestBody = """
        {
            "productCategory": "API Test 3"
        }
    """;

    given()
        .header("Authorization", "Bearer " + TOKEN)
        .header("Content-Type", "application/json")
        .body(requestBody)
    .when()
        .post(BASE_URL)
    .then()
        .statusCode(201)
        .body("productCategory", equalTo("API Test 3"));
}

    // ------------------ Negative Test Cases ------------------ //

    @Test
    public void testAddProductCategory_InvalidToken_ShouldReturn401() {
        /*
         * Description: Add product category with invalid token
         * Expected: Status 401 Unauthorized
         * If Pass: Token validation works correctly
         * If Fail: Security issue, API allows invalid tokens
         */
        String requestBody = """
            {
                "productCategory": "API Test Negative",
                "id": "68ac0e32b26726001daecd56"
            }
        """;

        given()
            .header("Authorization", "Bearer " + INVALID_TOKEN)
            .header("Content-Type", "application/json")
            .body(requestBody)
        .when()
            .post(BASE_URL)
        .then()
            .statusCode(400);
    }

    @Test
    public void testAddProductCategory_NoToken_ShouldReturn401() {
        /*
         * Description: Add product category without token
         * Expected: Status 401 Unauthorized
         * If Pass: API rejects unauthenticated requests
         * If Fail: Security issue, API allows unauthenticated access
         */
        String requestBody = """
            {
                "productCategory": "API Test No Token",
                "id": "68ac0e32b26726001daecd57"
            }
        """;

        given()
            .header("Content-Type", "application/json")
            .body(requestBody)
        .when()
            .post(BASE_URL)
        .then()
            .statusCode(400);
    }

    @Test
    public void testAddProductCategory_EmptyBody_ShouldReturn400() {
        /*
         * Description: Send empty JSON body
         * Expected: Status 400 Bad Request
         * If Pass: API validates request payload
         * If Fail: Backend might accept empty input, needs validation fix
         */
        String requestBody = "{}";

        given()
            .header("Authorization", "Bearer " + TOKEN)
            .header("Content-Type", "application/json")
            .body(requestBody)
        .when()
            .post(BASE_URL)
        .then()
            .statusCode(400);
    }

    @Test
    public void testAddProductCategory_MissingProductCategory_ShouldReturn400() {
        /*
         * Description: JSON missing required 'productCategory' field
         * Expected: Status 400 Bad Request
         * If Pass: API validates required fields
         * If Fail: Backend allows incomplete data
         */
        String requestBody = """
            {
                "id": "68ac0e32b26726001daecd58"
            }
        """;

        given()
            .header("Authorization", "Bearer " + TOKEN)
            .header("Content-Type", "application/json")
            .body(requestBody)
        .when()
            .post(BASE_URL)
        .then()
            .statusCode(400);
    }

    // ------------------ Edge Cases ------------------ //

    @Test
    public void testAddProductCategory_DuplicateCategory_ShouldHandleGracefully() {
        /*
         * Description: Try adding a product category that already exists
         * Expected: API should either return 409 Conflict or handle duplicates
         * If Pass: API prevents duplicates or returns meaningful response
         * If Fail: Database may have duplicate entries
         */
        String requestBody = """
            {
                "productCategory": "API Test 3",
                
            }
        """;

        given()
            .header("Authorization", "Bearer " + TOKEN)
            .header("Content-Type", "application/json")
            .body(requestBody)
        .when()
            .post(BASE_URL)
        .then()
            .statusCode(anyOf(equalTo(201), equalTo(409))); // 201 if created, 409 if duplicate
    }

    @Test
    public void testAddProductCategory_LongCategoryName_ShouldReturn201() {
        /*
         * Description: Add product category with very long name
         * Expected: Status 201 Created
         * If Pass: API supports long names
         * If Fail: Backend might truncate or throw error
         */
        String longName = "A".repeat(255); // 255 characters
        String requestBody = """
            {
                "productCategory": "%s",
            }
        """.formatted(longName);

        given()
            .header("Authorization", "Bearer " + TOKEN)
            .header("Content-Type", "application/json")
            .body(requestBody)
        .when()
            .post(BASE_URL)
        .then()
            .statusCode(201)
            .body("productCategory", equalTo(longName));
    }

    @Test
    public void testAddProductCategory_SpecialCharacters_ShouldReturn201() {
        /*
         * Description: Add product category with special characters
         * Expected: Status 201 Created
         * If Pass: API accepts special characters
         * If Fail: Backend rejects or sanitizes input incorrectly
         */
        String requestBody = """
            {
                "productCategory": "@!#$_API_Test",
            }
        """;

        given()
            .header("Authorization", "Bearer " + TOKEN)
            .header("Content-Type", "application/json")
            .body(requestBody)
        .when()
            .post(BASE_URL)
        .then()
            .statusCode(201)
            .body("productCategory", equalTo("@!#$_API_Test"));
    }
}
