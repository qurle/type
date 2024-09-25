export default function NodesList() {
	return (
		<>
			<button className="new">
				<span>new</span><span>+</span>
			</button>
			<hr />
			<ul className="notes">
				<li>
					<span className="name">File 1 Final</span><span className="date">Sep 25</span>
				</li>
				<li>
					<span className="name">My thoughts on the totally strange appear of green truck in The Cars</span><span className="date">Aug 13</span>
				</li>
				<li>
					<span className="name">Nobody came to my birthday</span><span className="date">Jul 29</span>
				</li>
				<li>
					<span className="name">I need a place to put my thoughts</span><span className="date">June 20</span>
				</li>
				<li>
					<span className="name">Never going to jail again</span><span className="date">June 18</span>
				</li>
			</ul>
		</>
	)
}