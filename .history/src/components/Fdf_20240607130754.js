import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdf from './Ban-do-quy-hoach-huyen-Me-Linh-Ha-Noi-den-nam-2030.pdf'

const Fdf = () =>  {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      
    </div>
  );
}

export default Fdf;