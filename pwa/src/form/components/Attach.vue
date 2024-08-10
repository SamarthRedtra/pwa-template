<template>
    <div>
        <div class="p-2">
          <FileUploader
            :fileTypes="['image/*']"
            :validateFile="(fileObject) => {}"
            @success="handleFileUploadSuccess"
          >
            <template #default="{ openFileSelector, uploading, progress }">
              <Button
                @click="openFileSelector"
                :loading="uploading"
              >
                Attached {{ progress }}%
              </Button>
            </template>
          </FileUploader>
        </div>
        <div class=" p-2">
            <div class=" w-full h-[2rem] border-[1.5px] border-gray-200 rounded-lg">
                <div class=" flex">
                    <FeatherIcon name="link-2" class="w-4 h-4 mt-2 ml-2 text-gray-600 hover:text-black hover:cursor-pointer"/>
                    <p class=" pl-2 text-[10px] p-2 truncate w-[7rem] text-gray-600">Name: {{ File.file_name }}</p>
                    <p class=" pl-2 text-[10px] p-2 truncate w-[5rem] text-gray-600">Size: {{ File.file_size }} </p>
                    <p class=" pl-2 text-[10px] p-2 truncate w-[5rem] text-gray-600">URL: {{ File.file_url }} </p>
                    <FeatherIcon name="x" class="w-4 h-4 mt-2 ml-auto mr-2 text-gray-600 hover:text-black hover:cursor-pointer"/>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { FileUploader, Button, FeatherIcon } from 'frappe-ui';
  import { reactive, watch } from 'vue';
  
  const File = reactive({
    content_hash: '',
    creation: '',
    docstatus: 0,
    doctype: 'File',
    file_name: '',
    file_size: 0,
    file_type: '',
    file_url: '',
    folder: 'Home',
    idx: 0,
    is_attachments_folder: 0,
    is_folder: 0,
    is_home_folder: 0,
    is_private: 0,
    modified: '',
    modified_by: 'Administrator',
    name: '',
    owner: 'Administrator',
    uploaded_to_dropbox: 0,
    uploaded_to_google_drive: 0,
  });
  
  const handleFileUploadSuccess = (file) => {
    File.content_hash = file.content_hash;
    File.creation = file.creation;
    File.docstatus = file.docstatus;
    File.file_name = file.file_name;
    File.file_size = file.file_size;
    File.file_type = file.file_type;
    File.file_url = file.file_url;
    File.folder = file.folder;
    File.idx = file.idx;
    File.is_attachments_folder = file.is_attachments_folder;
    File.is_folder = file.is_folder;
    File.is_home_folder = file.is_home_folder;
    File.is_private = file.is_private;
    File.modified = file.modified;
    File.modified_by = file.modified_by;
    File.name = file.name;
    File.owner = file.owner;
    File.uploaded_to_dropbox = file.uploaded_to_dropbox;
    File.uploaded_to_google_drive = file.uploaded_to_google_drive;
  };
  
  watch(File, (file) => {
    console.log(file);
  });
  </script>
  
  <style>
  </style>
  