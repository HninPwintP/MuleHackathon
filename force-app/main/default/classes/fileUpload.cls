public class fileUpload {
    @AuraEnabled(cacheable = false)
    public static String callDinosaurApi(String endpoint,String fileName, String fileType, String fileBody) {
        system.debug(endpoint);
        //Body
        String boundary = '------------' + String.valueOf(DateTime.now().getTime());
        String body = '';
        body +=  '--' + boundary+'\r\n'
            + 'Content-Disposition: form-data; name="' + fileName + '"'
            + '\r\n\r\n' + fileBody + '\r\n';
        body += '--' + boundary + '--\r\n';
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        req.setHeader('Cache-Control', 'no-cache');
        req.setHeader('Content-Length', String.valueOf(body.length()));
        req.setHeader('Content-Type', 'multipart/form-data;boundary='+ boundary);
        system.debug(body);
        req.setBody(body);
        HTTPResponse response = http.send(req);
        System.debug(response);
        
        return response.getBody();
    }
}