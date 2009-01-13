<?php

/**
 * API Demonstration code for RPX.  Runs only on PHP 5.  Requires CURL
 * and DOM XML parsing support.
 *
 * Instantiate RPX with your API key and RPX API URL.  The public
 * interface returns DOMDocument objects to be parsed by your
 * application.  You can choose to request JSON data, which requires a
 * different parser not available on most PHP installations.
 *
 * The demonstration API throws APIException on HTTP or parsing error.
 *
 * $rpx = new RPX("1422262b85e296164f95913b9efc0d8316754b35",
 *                "http://EXAMPLE.rpxnow.com/");
 */

class APIException extends Exception {}

class RPX {
    var $api_key = null;
    var $base_url = null;
    var $format = "xml";
    var $response_body = "";

    function RPX($api_key, $base_url) {
        while ($base_url[strlen($base_url) - 1] == "/") {
            $base_url = substr($base_url, 0, strlen($base_url) - 1);
        }

        $this->api_key = $api_key;
        $this->base_url = $base_url;
    }

    /*
     * Performs the 'auth_info' API call to retrieve information about
     * an OpenID authentication response.  You'll need to inspect the
     * resulting DOMDocument to get information about the response.
     * See the API documentation for details.
     *
     * https://rpxnow.com/docs
     */
    public function auth_info($token) {
        return $this->apiCall("auth_info", array("token" => $token));
    }

    /*
     * Returns an array of identifier mappings for the specified
     * primary key.
     */
    public function mappings($primary_key) {
        $doc = $this->apiCall(
             "mappings", array("primaryKey" => $primary_key));

        $identifiers = array();

        $xpath = new DOMXPath($doc);
        $nodes = $xpath->query("/rsp/identifiers/identifier");

        foreach ($nodes as $identifier_node) {
          $identifiers[] = $identifier_node->textContent;
        }

        return $identifiers;
    }

    /*
     * Maps an identifier to a primary key from your application.
     * Returns null.
     */
    public function map($identifier, $primary_key) {
        $this->apiCall("map", array("primaryKey" => $primary_key,
                                    "identifier" => $identifier));
    }

    /*
     * Removes a mapping for an identifier and primary key.  Returns
     * null.
     */
    public function unmap($identifier, $primary_key) {
        $this->apiCall("unmap", array(
            "primaryKey" => $primary_key,
            "identifier" => $identifier));
    }

    /*
     * Performs an API call using the specified name and arguments
     * array.  Automatically adds your API key to the request and
     * requests an XML response.  Returns a DOMDocument or raises
     * APIException.
     */
    private function apiCall($method_name, $partial_query) {
        $partial_query["format"] = $this->format;
        $partial_query["apiKey"] = $this->api_key;

        $query_str = "";
        foreach ($partial_query as $k => $v) {
            if (strlen($query_str) > 0) {
                $query_str .= "&";
            }

            $query_str .= urlencode($k);
            $query_str .= "=";
            $query_str .= urlencode($v);
        }

        $url = $this->base_url . "/api/v2/" . $method_name;
        $response_body = $this->_post($url, $query_str);

        $api_response = $this->_parse($response_body);
        $status = $this->_getMessageStatus($api_response);

        if ($status != 'ok') {
            throw new APIException(
              sprintf("API status was not 'ok', got '%s' instead", $status));
        }

        return $api_response;
    }

    private function _getMessageStatus($parsed_response) {
        $root = $parsed_response->childNodes->item(0);
        $node = $root->attributes->getNamedItem('stat');
        return $node->value;
    }

    private function _resetPostData() {
        $this->response_data = "";
    }

    private function _writeResponseData($curl_handle, $raw) {
        $this->response_data .= $raw;
        return strlen($raw);
    }

    private function _post($url, $post_data) {
        $this->_resetPostData();

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_WRITEFUNCTION,
                    array(&$this, "_writeResponseData"));

        curl_exec($curl);

        $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        if (!$code) {
            throw new APIException(
              sprintf("Error performing HTTP request: %s", curl_error($curl)));
        }

        $response_body = $this->response_data;
        $this->_resetPostData();
        curl_close($curl);

        return $response_body;
    }

    private function _parse($raw) {
        $doc = new DOMDocument;

        if (!$doc->loadXML($raw)) {
            throw new APIException("Error parsing XML response");
        }

        return $doc;
    }
}

?>
