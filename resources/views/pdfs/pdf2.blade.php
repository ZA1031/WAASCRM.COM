<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>
<style>
    body {
        font-family:system-ui, sans-serif;
    }
    .page-break {
        page-break-after: always;
    }
    .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
    .section {
        width: 100%;
        height: 300px;
    }
    .header {
        width: 100%;
        height: auto;
        border-bottom: 4px solid #dee2e6 !important;
    }
    .title-1-right{
        font-size: 40px;
        text-align: right;
    }
    .title-2-right{
        font-size: 50px;
        text-align: right;
        font-weight: bold;
    }
    .title-1-left{
        font-size: 40px;
        text-align: left;
    }
    .title-2-left{
        font-size: 50px;
        text-align: left;
        font-weight: bold;
    }
    .header-image{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .header-image img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        /* margin-right: -15px;
        margin-left: -15px; */
    }
    .row::after {
        content: "";
        clear: both;
        display: table;
    }

    .col-2 {
        width: 50%;
        float: left;
        box-sizing: border-box;
        /* padding-right: 15px;
        padding-left: 15px; */
    }

    .text-primary {
        color: #021470;
    }

    .text-secondary {
        color: #7d91f5;
    }


</style>
<body>
<div class="page-break"></div>
    <div class="container">
        <div class="section">
            <div class="header">
                <!-- <div class="header-image">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" style="width: 10%; height: auto;" alt="">
                </div> -->
                <div class="title-1-right">
                    <span class="text-secondary">La solución</span>
                </div>
                <div class="title-2-right">
                    <span class="text-primary">Ecológica</span>
                </div>
                
            </div>
            <div class="row">
                <div class="col-2">
                    <ul style="list-style-type: none; padding-left: 10px;">
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Agua de proximidad</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Agua ilimitada</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Agua libre de plásticos</li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul style="list-style-type: none; padding-left: 10px;">
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Sin emisiones de CO2d</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Libre de contaminantes químicos y bacterias</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;">- Sin contaminar el planeta</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="header">
                <!-- <div class="header-image">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" style="width: 10%; height: auto;" alt="">
                </div> -->
                <div class="title-1-left">
                    <span class="text-secondary">Nuestras</span>
                </div>
                <div class="title-2-left">
                    <span class="text-primary">Ventajas</span>
                </div>
                
            </div>
            <div class="row">
                <div class="col-2">
                    <ul style="list-style-type: none; padding-left: 10px;">
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>-Calidad:</strong> Materiales de grado alimentario </li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>-Total libertad:</strong> sin horarios ni repartos</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>-Higiénico y seguro:</strong> evitando el contacto físico</li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul style="list-style-type: none; padding-left: 10px;">
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>- Esfuerzo cero:</strong> eliminamos las pesadas garrafas</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>- Cuota fija:</strong> sin sorpresas en las facturas</li>
                        <li class="text-secondary" style="margin-bottom: 15px; font-size: 15px;"><strong>- Libre de plásticos:</strong> sin contaminar el planeta</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="header">
                <!-- <div class="header-image">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" style="width: 10%; height: auto;" alt="">
                </div> -->
                <div class="title-1-right">
                    <span class="text-secondary">Compromiso</span>
                </div>
                <div class="title-2-right">
                    <span class="text-primary">Medioambiental</span>
                </div>
                
            </div>
            <div class="text-secondary" style="margin-top: 20px; font-size: 15px;">
                Gracias a la asociación <strong>Stoplastic</strong> su negocio quedará identificado como empresa colaboradora con el
                medio ambiente. Ofreciendo <strong>un agua libre de plásticos y sin emisiones de CO2</strong>
                , ayudando a la sostenibilidad del planeta. <br><br>
                Además todos nuestros dispensadores cumplen con la Norma <strong>UNE 149101</strong> y con el <strong>Real Decreto 140/2003 
                y 742/2013.</strong>
            </div>
        </div>
    </div>
</body>
</html>
