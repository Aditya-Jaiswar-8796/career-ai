import subprocess


def generate_pdf(data, template_name):

    template_path = f"templates/{template_name}.tex"

    with open(template_path) as f:
        template = f.read()

    for key, value in data.items():
        template = template.replace(f"{{{{{key}}}}}", str(value))

    with open("output.tex", "w") as f:
        f.write(template)

    subprocess.run(["pdflatex", "output.tex"])

    return "output.pdf"