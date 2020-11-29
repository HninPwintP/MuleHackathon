public with sharing class AttachmentController {

    private AttachmentController(){
    }

    @AuraEnabled
    public static list<attachment> getAttachmentList(Id parentId){
        return [
            SELECT
                Id,
                Name,
                ContentType,
                OwnerId,
                Owner.Name,
                CreatedDate,
                CreatedById,
                LastModifiedDate,
                LastModifiedById
            FROM
                Attachment
            WHERE
                ParentId = :parentId AND
                IsDeleted = false AND
                IsPrivate = false
            ORDER BY
                CreatedDate DESC
        ];
    }

    @AuraEnabled
    public static Attachment saveFile(Id idParent, String strFileName, String base64Data) {

        // Decoding base64Data
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');

        // inserting file
        Attachment cv = new Attachment();
        cv.ParentId = idParent;
        cv.Name = strFileName;
        cv.Body = EncodingUtil.base64Decode(base64Data);

        Insert cv;
        return cv;
    }

    @AuraEnabled
    public static void deleteAttachments(list<Id> lstConIds){
        try {
            list<Attachment> lstConsToDelete = new list<Attachment>();
            System.debug('lstConIds ====> '+ lstConIds);
            for(Id idCon : lstConIds) {
                lstConsToDelete.add(new Attachment(Id = idCon));
            }
            if(!lstConsToDelete.isEmpty()) {
                delete lstConsToDelete;
            }
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

}