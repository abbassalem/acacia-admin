import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../../file-upload.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload-details',
  templateUrl: 'upload-details.component.html'
})

export class UploadDetailsComponent implements OnInit {

  @Input() fileUpload: FileUpload;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}