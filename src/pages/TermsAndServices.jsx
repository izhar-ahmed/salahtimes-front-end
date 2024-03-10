import { useEffect } from 'react';
import Header2 from '../components/common/Header2';
import CustomCTASection from '../components/CustomCTASection';

const TermsAndServices = () => {
	useEffect(() => {
		window.scroll(0, 0)
	}, [])
  return (
    <>
      <Header2
				heading={<h1 className="text-5xl leading-tight md:text-6xl lg:text-6xl font-bold text-grey mb-0">
					Terms and <span className="font-light">Conditions</span>
				</h1>}
				subHeading={`Please read the following terms and conditions carefully before using our services.`}
			/>
      <div className="container mx-auto mb-20">
        <h1 className="text-3xl font-semibold mb-4">Terms and Services for Salahtimes App</h1>
        <p>Welcome to Salahtimes! These Terms and Services govern your use of the Salahtimes mobile application (the App) and any related services provided by us.</p>
        
        <p>By accessing or using the App, you agree to be bound by these Terms and Services. If you disagree with any part of the terms, then you may not access the App.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p>By accessing the App, you agree to be bound by these Terms and Services and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing the App.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the App for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:</p>
        <ul className="list-disc pl-6">
          <li>Modify or copy the materials;</li>
          <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial);</li>
          <li>Attempt to decompile or reverse engineer any software contained within the App;</li>
          <li>Remove any copyright or other proprietary notations from the materials; or</li>
          <li>Transfer the materials to another person or mirror the materials on any other server.</li>
        </ul>
        <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Salahtimes at any time.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Privacy Policy</h2>
        <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the App, to understand our practices.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Disclaimer</h2>
        <p>The materials within the App are provided on an as is basis. Salahtimes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        <p>Further, Salahtimes does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its App or otherwise relating to such materials or on any sites linked to the App.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitations</h2>
        <p>In no event shall Salahtimes or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the App, even if Salahtimes or a Salahtimes authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Modifications</h2>
        <p>Salahtimes may revise these terms of service for its App at any time without notice. By using the App, you are agreeing to be bound by the then current version of these Terms and Services.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws of india and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        
        <p className="mt-8">By using the Salahtimes App, you signify your acceptance of these terms. If you do not agree to these terms, please do not use our App.</p>
        
        <p>If you have any questions about these Terms and Services, please contact us at izharahmed1280@gmail.com.</p>
        
        <p className="mt-4">Last updated: 10 feb 2024</p>
      </div>
      <CustomCTASection
				heading={<h2 className="text-5xl leading-tight md:text-6xl lg:text-6xl font-bold text-white mb-0"><span className="font-light">Let&apos;s</span> Explore The Mosque Locations <span className="font-light">together!</span></h2>}
				subheading={<p className="text-lg font-medium text-white">Find the Right Direction for Prayer.</p>}
				exploreLabel="Explore Mosques"
				directionsLabel="Get Directions"
			/>
    </>
  );
}

export default TermsAndServices;
