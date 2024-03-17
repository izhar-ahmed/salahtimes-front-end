import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    // Extract path segments from the current URL
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

    // Generate breadcrumb items based on path segments
    const breadcrumbItems = pathSegments.map((segment, index) => ({
      label: segment,
      path: `/${pathSegments.slice(0, index + 1).join('/')}`,
    }));

    setBreadcrumbs(breadcrumbItems);
  }, [location.pathname]);

  return (
    <nav aria-label="Breadcrumb" className="flex mb-10">
      <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className={`relative flex items-center ${index !== 0 ? 'ms-1.5' : ''}`}>
            {index !== 0 && (
              <span
                className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 clip-path-polygon rtl:rotate-180"
              ></span>
            )}

            <Link
              to={breadcrumb.path}
              className={`flex h-10 items-center ${
                index === 0
                  ? 'bg-gray-100 px-4 transition hover:text-gray-900'
                  : 'bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900'
              }`}
            >
              {index === 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              )}

              <span className={`ms-1.5 ${index === 0 ? 'text-xs font-medium' : ''}`}>{breadcrumb.label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
