
~simulation = BrutesAndBullies();
~simulation.init()
~simulation.start("x")

~simulation.attach("x","nanite","maxAge")
~simulation.attach("x","depfm","averageEnergy")
~simulation.start("y")
~simulation.attach("y","bloded")

~simulation.scene(["x","y"], [2,6])
~simulation.fold(["x","y"], "bloded")
~simulation.seed()

~simulation.terminate()