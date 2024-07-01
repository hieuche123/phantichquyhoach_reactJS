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
      <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default Fdf;