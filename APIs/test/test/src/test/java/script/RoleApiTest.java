package script;

import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;

public class RoleApiTest {

    private static final String VALID_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODk5YzExNWM2MjIxZTAwMWU3N2MxYmYiLCJpYXQiOjE3NTYxMDMxMDcsInR5cGUiOiJyZWZyZXNoIn0.dgVRe7MA6TsfEtyrlIKzb4Dl2-2T8bGwV05QVE0PA7k";

    private static final String INVALID_TOKEN = "INVALID_TOKEN";

    private static final String BASE_URL = "https://pxxxinvsvu.us-east-1.awsapprunner.com/v1/role";

    // ------------------ Positive Test Cases ------------------ //

    @Test
    public void testGetRoleApi_ValidToken_ShouldReturn200Or304() {
        /*
         * Test Description: Call Role API with a valid token
         * Expected: Status code 200 or 304
         *
         * If Test Passes:
         *   - The API is accessible and authentication works correctly.
         *
         * If Test Fails:
         *   - Check if the token is expired or incorrect.
         *   - Verify if the API endpoint is up and accessible.
         *   - Check network issues.
         */
        given()
            .header("Authorization", "Bearer " + VALID_TOKEN)
            .header("Content-Type", "application/json")
            .accept("*/*")
        .when()
            .get(BASE_URL)
        .then()
            .statusCode(anyOf(equalTo(200), equalTo(304)))
            .header("etag", notNullValue());
    }

    @Test
    public void testGetRoleApi_ResponseBodyNotEmpty() {
        /*
         * Test Description: Verify the API returns results and dashboard_permissions
         *
         * If Test Passes:
         *   - Response structure is correct, API is returning expected fields.
         *
         * If Test Fails:
         *   - API might have changed response structure.
         *   - Check backend logic or database for missing permissions data.
         */
        given()
            .header("Authorization", "Bearer " + VALID_TOKEN)
            .header("Content-Type", "application/json")
        .when()
            .get(BASE_URL)
        .then()
            .statusCode(200)
            .body("results", notNullValue())
            .body("results[0].dashboard_permissions", notNullValue());
    }

    // ------------------ Negative Test Cases ------------------ //

    @Test
    public void testGetRoleApi_InvalidToken_ShouldReturn401() {
        /*
         * Test Description: Call API with an invalid token
         * Expected: Status code 401 Unauthorized
         *
         * If Test Passes:
         *   - Token validation is working correctly.
         *
         * If Test Fails:
         *   - Check API authentication logic.
         *   - Ensure security is enforced and tokens are verified properly.
         */
        given()
            .header("Authorization", "Bearer " + INVALID_TOKEN)
            .header("Content-Type", "application/json")
        .when()
            .get(BASE_URL)
        .then()
            .statusCode(401);
    }

    @Test
    public void testGetRoleApi_NoToken_ShouldReturn401() {
        /*
         * Test Description: Call API without token
         * Expected: Status code 401 Unauthorized
         *
         * If Test Passes:
         *   - API requires authentication as expected.
         *
         * If Test Fails:
         *   - Check API security configuration; it should not allow unauthenticated access.
         */
        given()
            .header("Content-Type", "application/json")
        .when()
            .get(BASE_URL)
        .then()
            .statusCode(401);
    }

    @Test
    public void testGetRoleApi_InvalidUrl_ShouldReturn404() {
        /*
         * Test Description: Call API with wrong URL
         * Expected: Status code 404 Not Found
         *
         * If Test Passes:
         *   - Invalid URLs are correctly handled.
         *
         * If Test Fails:
         *   - API routing may not be configured correctly.
         *   - Check backend for missing route handling.
         */
        given()
            .header("Authorization", "Bearer " + VALID_TOKEN)
        .when()
            .get("https://pxxxinvsvu.us-east-1.awsapprunner.com/v1/invalidRole")
        .then()
            .statusCode(404);
    }

    // ------------------ Edge Cases ------------------ //

    @Test
    public void testGetRoleApi_EmptyHeader_ShouldReturn401() {
        /*
         * Test Description: Call API with empty Authorization header
         * Expected: Status code 401 Unauthorized
         *
         * If Test Passes:
         *   - API correctly rejects empty headers.
         *
         * If Test Fails:
         *   - Check if API allows blank headers, which may be a security risk.
         */
        given()
            .header("Authorization", "")
        .when()
            .get(BASE_URL)
        .then()
            .statusCode(401);
    }

    @Test
    public void testGetRoleApi_UnsupportedContentType_ShouldReturn415() {
        /*
         * Test Description: Call API with unsupported Content-Type
         * Expected: Status code 415 Unsupported Media Type
         *
         * If Test Passes:
         *   - API validates request content type properly.
         *
         * If Test Fails:
         *   - Ensure server validates content type and rejects unsupported types.
         */
        given()
            .header("Authorization", "Bearer " + VALID_TOKEN)
            .header("Content-Type", "text/plain")
        .when()
            .get(BASE_URL)
        .then()
            .statusCode(415);
    }
}
